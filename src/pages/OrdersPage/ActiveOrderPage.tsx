import { useContext } from "react";
import UserContext from "../../context/UserContext";

const ActiveOrderPage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>Ваши заказы</h2>
      <div>
        {user?.orders.map((order) => (
          <div key={order.created_at}>Заказ от {new Date(order.created_at).toLocaleDateString('ru-RU')}</div>
        ))}
      </div>
    </>
  );
};

export default ActiveOrderPage;
