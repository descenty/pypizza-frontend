import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { IOrder, statuses } from "../../models";
import styles from "./ActiveOrderPage.module.css";

const ActiveOrderPage = () => {
  const { user } = useContext(UserContext);
  const [selectedOrder, selectOrder] = useState<IOrder | undefined>(
    user?.orders[0]
  );
  return (
    <div className={styles.active_order}>
      <div className={styles.active_orders_list}>
        {user?.orders.map((order) => (
          <button
            className={order === selectedOrder ? styles.active : undefined}
            onClick={() => selectOrder(order)}
            key={order.id}
          >
            <span>
              Заказ от&nbsp;
              {new Date(order.created_at).toLocaleString("ru", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>{statuses[order.status]}</span>
          </button>
        ))}
      </div>
      <h2>Ваши заказы</h2>
      <div>
        {user?.orders.map((order) => (
          <div key={order.created_at}>
            Заказ от {new Date(order.created_at).toLocaleDateString("ru-RU")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOrderPage;
