import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICart } from "../models";

interface IAppHeaderProps {
  toggleLoginWindow: () => void;
  toggleCart: () => void;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  logOut: () => void;
  cart: ICart | null;
}

const AppHeader = ({
  toggleLoginWindow,
  toggleCart,
  setShowCart,
  logOut,
  cart,
}: IAppHeaderProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => setShowCart(false), [location]);
  return (
    <header>
      <div>
        <div>
          <Link to="/">
            <h2>
              py
              <br />
              <span>pizza</span>
            </h2>
          </Link>
          <div className="search-div">
            <input type="text" name="search" id="search" placeholder="Поиск" />
            <AiOutlineSearch className="search-icon" />
          </div>
        </div>
        <div>
          <a href="#">г. Москва</a>
        </div>
      </div>
      <div>
        <div>
          <a href="#">Акции</a>
          <a href="#">Рестораны</a>
          <a href="#">Мои заказы</a>
        </div>
        <div>
          {user && (
            <button id="cart-button" onClick={() => toggleCart()}>
              <AiOutlineShopping className="cart-image" />
              {cart?.count !== 0 && (
                <span className="cart-span">{cart?.count}</span>
              )}
            </button>
          )}
          <button
            id="user-button"
            onClick={() => {
              !user ? toggleLoginWindow() : navigate("profile/");
            }}
          >
            <AiOutlineUser className="user-image" />
            {user && (
              <span className="bonus_points">
                {user?.bonus_points}&nbsp;
                <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
    // <header>
    //     <div>
    //         <h1>PyPizza</h1>
    //         <a onClick={() => toggleLoginWindow()}>{user ? user.phone : 'Войти'}</a>
    //         {user && <a onClick={() => logOut()}>Выйти</a>}
    //         <a onClick={() => toggleCart()}>Корзина</a>
    //     </div>
    //     <nav>
    //         <a href="">Пицца</a>
    //         <a href="">Закуски</a>
    //         <a href="">Десерты</a>
    //         <a href="">Напитки</a>
    //         <a href="">Акции</a>
    //         <a href="">О проекте</a>
    //         <a href="http://127.0.0.1:8000/admin/">Админ-панель</a>
    //     </nav>
    // </header >
  );
};

export default AppHeader;
