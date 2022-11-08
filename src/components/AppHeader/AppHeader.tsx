import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICart } from "../../models";
import styles from "./AppHeader.module.css";

interface IAppHeaderProps {
  toggleLoginWindow: () => void;
  toggleCart: () => void;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  toggleCitySelectWindow: () => void;
  logOut: () => void;
  cart: ICart | null;
  city: string | undefined;
}

const AppHeader = ({
  toggleLoginWindow,
  toggleCart,
  setShowCart,
  toggleCitySelectWindow,
  logOut,
  cart,
  city,
}: IAppHeaderProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => setShowCart(false), [location, setShowCart]);
  return (
    <>
      <header className="big_header">
        <div>
          <div>
            <Link to="/" className="logo">
              <img src={process.env.PUBLIC_URL + "/PyPizza.png"} alt="" />
              {/* <h2>
              py
              <br />
              <span>pizza</span>
            </h2> */}
            </Link>
            <div className="search-div">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Поиск"
              />
              <AiOutlineSearch className="search-icon" />
            </div>
          </div>
          <div>
            <a href="#" onClick={toggleCitySelectWindow}>
              г. {city}
            </a>
          </div>
        </div>
        <div>
          <div>
            <a href="#">Акции</a>
            <Link to="restaurants/">Рестораны</Link>
            {user &&
              user!.orders!.filter((order) => order.status !== "COMPLETED")
                .length > 0 && (
                <Link to="orders/" className="active_order_link">
                  Активный заказ
                </Link>
              )}
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
      <div className={styles.mobile_header}>
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
    </>
  );
};

export default AppHeader;
