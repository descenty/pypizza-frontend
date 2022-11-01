import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { addToCart, removeFromCart } from "../../APIFunctions";
import { baseURL } from "../../App";
import { Category, getSizeName, ICart, SizeType } from "../../models";
import styles from "./Cart.module.css";

interface ICartProps {
  toggleCart: () => void;
  showCart: boolean | null;
  cart: ICart | null;
  updateCart: () => void;
  toggleOrderConfirmation: () => void;
}

const Cart = ({
  toggleCart,
  showCart,
  cart,
  updateCart,
  toggleOrderConfirmation,
}: ICartProps) => {
  return (
    <>
      {showCart && (
        <div
          className={`backtrigger ${styles.backtrigger} ${showCart ? styles.open : styles.close}`}
          onClick={() => toggleCart()}
        ></div>
      )}
      <div
        className={`${styles.cart} ${showCart ? styles.open : styles.close}`}
      >
        <div className={styles.cart_header}>
          <h3>Корзина</h3>
          <GrFormClose
            className={styles.close_button}
            onClick={() => toggleCart()}
          />
        </div>
        <div className={styles.cart_goods}>
          {!cart && <h4>Не удалось загрузить корзину</h4>}
          {cart?.cart_goods.length === 0 && <h4>Корзина пуста</h4>}
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
                  onClick={() =>
                    removeFromCart(
                      cart_good.good,
                      cart_good.configuration
                    ).then(() => updateCart())
                  }
                />
                <span>{cart_good.quantity}</span>
                <AiOutlinePlus
                  className={styles.quantity_change}
                  onClick={() =>
                    addToCart(cart_good.good, cart_good.configuration).then(
                      () => updateCart()
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {cart && (
          <div className={styles.to_payment_div}>
            <input type="text" placeholder="Промокод" />
            <span>
              Итого: <b>{cart?.total_with_discount} ₽</b>
            </span>
            <button onClick={() => toggleOrderConfirmation()}>
              К оформлению заказа
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
