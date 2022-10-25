import { useContext } from "react";
import UserContext from "../context/UserContext";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

interface IAppHeaderProps {
  toggleLoginWindow: () => void;
  toggleCart: () => void;
  logOut: () => void;
}

const AppHeader = ({
  toggleLoginWindow,
  toggleCart,
  logOut,
}: IAppHeaderProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <header>
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
        <a href="#">г. Москва</a>
      </div>
      <div>
        <a href="#">Акции</a>
        <a href="#">Рестораны</a>
        <a href="#">Мои заказы</a>
        <button id="cart-button" onClick={() => toggleCart()}>
          <AiOutlineShopping className="cart-image" />
          <span className="cart-span">4</span>
        </button>
        <button
          id="user-button"
          onClick={() => {
            !user ? toggleLoginWindow() : navigate("profile/");
          }}
        >
          <AiOutlineUser className="user-image" />
          <span className="bonus_points">
            {user?.bonus_points}&nbsp;
            <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
          </span>
        </button>
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
