import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICart } from "../../models";
import styles from "./AppHeader.module.css";

interface IAppHeaderProps {
  toggleLoginWindow: () => void;
  toggleCart: () => void;
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  toggleCitySelectWindow: () => void;
  cart: ICart | null;
  city: string | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const AppHeader = ({
  toggleLoginWindow,
  toggleCart,
  toggleCitySelectWindow,
  showCart,
  setShowCart,
  cart,
  city,
  setLoading,
}: IAppHeaderProps) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setShowCart(false);
  }, [location, setLoading, setShowCart]);
  const navigateToMain = () => {
    if (location.pathname !== "/") {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
      setTimeout(() => navigate("/"), 900);
    }
  };
  return (
    <>
      <header className="big_header">
        <div>
          <div>
            <button className={styles.logo} onClick={navigateToMain}>
              {/* <img src={process.env.PUBLIC_URL + "/PyPizza.png"} alt="" /> */}
              <h2>
                py
                <br />
                <span>pizza</span>
              </h2>
            </button>
            <div className={`search-div ${styles.to_hide}`}>
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
          <div className={styles.to_hide}>
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
        <button onClick={navigateToMain}>
          <AiOutlineHome className="cart-image" />
        </button>
        <button
          onClick={() => {
            !user ? toggleLoginWindow() : navigate("profile/");
          }}
        >
          <AiOutlineUser className="user-image" />
          {user && (
            <span className={styles.bonus_points}>
              {user?.bonus_points}&nbsp;
              <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
            </span>
          )}
        </button>
        {user && (
          <button onClick={() => toggleCart()}>
            <AiOutlineShopping className="cart-image" />
            {cart?.count !== 0 && (
              <span className={styles.cart_span}>{cart?.count}</span>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export default AppHeader;
