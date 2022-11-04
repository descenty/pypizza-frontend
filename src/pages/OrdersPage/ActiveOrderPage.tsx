import { useContext, useEffect, useState } from "react";
import { baseURL } from "../../App";
import UserContext from "../../context/UserContext";
import { Category, getSizeName, IOrder, statuses } from "../../models";
import { ruDate } from "../../utils";
import styles from "./ActiveOrderPage.module.css";

const ActiveOrderPage = () => {
  const { user } = useContext(UserContext);
  const [selectedOrder, selectOrder] = useState<IOrder | undefined>();
  useEffect(() => selectOrder(user?.orders[0]), [user]);
  return (
    <div className={styles.active_order_page}>
      <div className={styles.active_orders_list}>
        {user?.orders.map((order) => (
          <button
            className={order === selectedOrder ? styles.active : undefined}
            onClick={() => selectOrder(order)}
            key={order.id}
          >
            <span>
              Заказ от&nbsp;
              {ruDate(order.created_at)}
            </span>
            <span>{statuses[order.status]}</span>
          </button>
        ))}
      </div>
      {selectedOrder && (
        <div className={styles.selected_order}>
          <h2>Заказ от {ruDate(selectedOrder.created_at)}</h2>
          <h2>Статус: {statuses[selectedOrder.status]}</h2>
          <div className={styles.ordered_goods}>
            {selectedOrder.ordered_goods.map((ordered_good, index) => (
              <div key={index}>
                <img src={baseURL + ordered_good.image} alt="" />
                <div>
                  <h4>{ordered_good.name}</h4>
                  <p>{getSizeName(ordered_good.category, ordered_good.size)}</p>
                </div>
                <h4>{ordered_good.quantity}</h4>
                <p className={styles.ordered_good_price}>{ordered_good.price} ₽</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderPage;
