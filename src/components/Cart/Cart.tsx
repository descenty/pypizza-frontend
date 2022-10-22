import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./Cart.module.css";

interface ICartProps {
  toggleCart: () => void;
}

const Cart = ({ toggleCart }: ICartProps) => {
  return (
    <div className={styles.cart}>
      <div className={styles.cart_header}>
        <h3>Корзина</h3>
        <AiOutlineClose
          className={styles.close_button}
          onClick={() => toggleCart()}
        />
      </div>
      <div className={styles.cart_goods}>
        <div>
          <img src="pepperoni fresh.png" alt="" />
          <div>
            <h4>Пепперони фреш</h4>
            <span>Средняя, 30 см.</span>
          </div>
          <div className={styles.good_quantity}>
            <AiOutlinePlus className={styles.quantity_change} />
            <span>3</span>
            <AiOutlineMinus className={styles.quantity_change} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
