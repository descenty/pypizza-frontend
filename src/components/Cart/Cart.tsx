import { AxiosError } from "axios";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { addToCart, removeFromCart } from "../../APIFunctions";
import { axiosInstance, baseURL } from "../../settings";
import { Category, getSizeName, ICart, SizeType } from "../../models";
import CircleLoader from "../CircleLoader/CircleLoader";
import styles from "./Cart.module.css";

interface ICartProps {
  toggleCart: () => void;
  showCart: boolean | null;
  cart: ICart | null;
  updateCart: () => void;
  toggleOrderConfirmation: () => void;
}
const changeDelay = 500;
const Cart = ({
  toggleCart,
  showCart,
  cart,
  updateCart,
  toggleOrderConfirmation,
}: ICartProps) => {
  const [changeTimeout, setChangeTimeout] = useState<boolean>();
  const [promoCodeInput, setPromoCodeInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const setCartPromoCode = async (promo_code: string) => {
    try {
      await axiosInstance.post("set_cart_promo_code/", {
        promo_code: promo_code.toUpperCase(),
      });
      setError(null);
      updateCart();
    } catch (e) {
      const error = e as AxiosError;
      if (error && error.response!.status === 404) {
        setError("промокод не найден");
        setTimeout(() => setError(null), 3000);
      }
    }
  };
  return (
    <>
      {showCart && (
        <div
          className={`backtrigger ${styles.backtrigger} ${
            showCart ? styles.open : styles.close
          }`}
          onClick={() => toggleCart()}
        ></div>
      )}
      <div
        className={`${styles.cart} ${showCart ? styles.open : styles.close}`}
      >
        <div
          className={`${styles.timeout_div} ${
            changeTimeout ? styles.open : styles.close
          }`}
        >
          <div className={styles.ldsring}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
        <div className={styles.cart_header}>
          <h3>Корзина</h3>
          <GrFormClose
            className={styles.close_button}
            onClick={() => toggleCart()}
          />
        </div>
        <div className={styles.cart_goods}>
          {!cart && <h4>Не удалось загрузить корзину</h4>}
          {cart?.cart_goods.length === 0 && (
            <div className={styles.empty_cart}>
              <AiOutlineShopping className={styles.empty_cart_icon} />
              <span>Корзина пуста</span>{" "}
            </div>
          )}
          {cart?.cart_goods.map((cart_good) => (
            <div key={cart_good.created_date}>
              <img src={baseURL + cart_good.good.image} alt="" />
              <div>
                <h4>{cart_good.good.name}</h4>
                <p>{cart_good.configuration.price} ₽</p>
                <span>
                  {getSizeName(
                    cart_good.good.category as Category,
                    cart_good.configuration.size as SizeType
                  )}
                </span>
              </div>
              <div className={styles.good_quantity}>
                <AiOutlineMinus
                  className={styles.quantity_change}
                  onClick={() => {
                    setChangeTimeout(true);
                    setTimeout(() => setChangeTimeout(false), changeDelay);
                    removeFromCart(
                      cart_good.good,
                      cart_good.configuration
                    ).then(() => updateCart());
                  }}
                />
                <span>{cart_good.quantity}</span>
                <AiOutlinePlus
                  className={`${styles.quantity_change} ${
                    cart_good.quantity >= 10 ? styles.disabled : ""
                  }`}
                  onClick={() => {
                    setChangeTimeout(true);
                    setTimeout(() => setChangeTimeout(false), changeDelay);
                    addToCart(cart_good.good, cart_good.configuration).then(
                      () => updateCart()
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {cart && cart.cart_goods.length > 0 && (
          <div className={styles.to_payment_div}>
            {cart.promo_code ? (
              <div className={styles.promo_code_div}>
                <span>
                  <b>{cart?.promo_code}</b> - {cart?.promo_code_name} (
                  {(cart.total_with_discount - cart.total).toFixed(2)} ₽)
                </span>
                <AiOutlineClose
                  className={`${styles.quantity_change} ${styles.close_button}`}
                  onClick={async () => {
                    setChangeTimeout(true);
                    setTimeout(() => setChangeTimeout(false), changeDelay);
                    await setCartPromoCode("");
                  }}
                />
              </div>
            ) : (
              <div className={styles.promo_code_input_div}>
                <input
                  type="text"
                  placeholder="Промокод"
                  value={promoCodeInput}
                  onChange={(event) => setPromoCodeInput(event.target.value)}
                />
                <button
                  disabled={!promoCodeInput}
                  onClick={async () => {
                    setChangeTimeout(true);
                    setTimeout(() => setChangeTimeout(false), changeDelay);
                    await setCartPromoCode(promoCodeInput);
                  }}
                >
                  OK
                </button>
              </div>
            )}
            {error && <span className={styles.error_span}>{error}</span>}
            <span>
              Итого: <b>{cart?.total_with_discount} ₽</b>
            </span>
            <button
              onClick={() => {
                setChangeTimeout(true);
                setTimeout(() => setChangeTimeout(false), changeDelay);
                toggleOrderConfirmation();
              }}
            >
              К оформлению заказа
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
