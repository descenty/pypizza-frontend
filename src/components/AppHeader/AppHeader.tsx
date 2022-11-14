import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineHome,
} from "react-icons/ai";
import { IoPizzaOutline } from "react-icons/io5";
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
                точка
                <br />
                <span>пицца</span>
              </h2>
            </button>
            <div className={`${styles.search_div} ${styles.to_hide}`}>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Поиск"
              />
              <AiOutlineSearch className={styles.search_icon} />
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
              user.orders.filter((order) => order.status !== "COMPLETED")
                .length > 0 && (
                <Link
                  to="orders/"
                  className={`${styles.active_order_link} ${styles.to_hide}`}
                >
                  Активный заказ
                </Link>
              )}
          </div>
          <div className={styles.to_hide}>
            {user && (
              <button className={styles.cart_button} onClick={() => toggleCart()}>
                <AiOutlineShopping className={styles.cart_image} />
                {cart?.count !== 0 && (
                  <span className={styles.cart_span}>{cart?.count}</span>
                )}
              </button>
            )}
            <button
              className={styles.user_button}
              onClick={() => {
                !user ? toggleLoginWindow() : navigate("profile/");
              }}
            >
              <AiOutlineUser className={styles.user_image} />
              {user && (
                <span className={styles.bonus_points}>
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
          <AiOutlineHome className={styles.cart_image} />
        </button>
        <button
          onClick={() => {
            !user ? toggleLoginWindow() : navigate("profile/");
          }}
        >
          <AiOutlineUser className={styles.user_image} />
          {user && (
            <span className={styles.bonus_points}>
              {user.bonus_points}&nbsp;
              <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
            </span>
          )}
        </button>
        {user && (
          <>
            <button onClick={() => toggleCart()}>
              <AiOutlineShopping className={styles.cart_image} />
              {cart?.count !== 0 && (
                <span className={styles.cart_span}>{cart?.count}</span>
              )}
            </button>
            {user.orders.filter((order) => order.status !== "COMPLETED")
              .length > 0 && (
              <button
                className={styles.orders_button}
                onClick={() => navigate("orders/")}
              >
                <IoPizzaOutline />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AppHeader;
