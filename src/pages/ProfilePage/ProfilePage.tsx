import { useContext, useState } from "react";
import { GrFormClose, GrLocation } from "react-icons/gr";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../App";
import NewAddressPage from "../../components/NewAddressPage/NewAddressPage";
import UserContext from "../../context/UserContext";
import { ISavedAddress } from "../../models";
import styles from "./ProfilePage.module.css";

interface IProfilePageProps {
  toggleNewAddressPage: () => void;
  logOut: () => void;
}

const ProfilePage = ({ toggleNewAddressPage, logOut}: IProfilePageProps) => {
  const { user } = useContext(UserContext);
  function useForceUpdate() {
    const [, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }
  const forceUpdate = useForceUpdate();
  const navigate = useNavigate();
  const deleteSavedAddress = async (address: ISavedAddress) => {
    await axiosInstance.post("delete-saved-address/", {
      address: address.name,
    });
    user!.saved_addresses = user!.saved_addresses.filter(
      (_address) => _address !== address
    );
    forceUpdate();
  };

  return user ? (
    <div className={styles.profile_div}>
      <h3>Личный кабинет</h3>
      <h2>{user?.phone}</h2>
      <h3 className={styles.bonus_points}>
        Бонусные баллы: &nbsp;{user?.bonus_points}&nbsp;
        <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
      </h3>
      {/* <div>
          <h3>Потратить бонусы:</h3>
        </div> */}
      {user.orders.length > 0 && (
        <div className={styles.orders_panel}>
          <h3>История заказов:</h3>
          <span>Последние 10 заказов</span>

          <div className={styles.orders}>
            <div className={styles.order}>
              <span>№</span>
              <span className={styles.column2}>Время заказа</span>
              <span className={styles.column2}>Сумма</span>
            </div>
            {user.orders.map(
              (order) =>
                order.status === "COMPLETED" && (
                  <div key={order.created_at} className={styles.order}>
                    <span>{order.id}</span>
                    <span className={styles.column2}>
                      {new Date(order.created_at).toLocaleString("ru", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className={styles.column2}>{order.total} ₽</span>
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <div className={styles.addresses_div}>
        <h3>Сохранённые адреса:</h3>
        {user?.saved_addresses.length > 0
          ? user.saved_addresses.map((saved_address) => (
              <div key={saved_address.name} className={styles.address}>
                <span>{saved_address.name}</span>
                <GrFormClose
                  className={styles.close_button}
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Вы действительно хотите удалите адрес: ${saved_address.name}`
                      )
                    )
                      await deleteSavedAddress(saved_address);
                  }}
                />
              </div>
            ))
          : <p>Нет сохранённых адресов</p>}
        <button onClick={() => toggleNewAddressPage()}>Добавить адрес</button>
        <button
          onClick={() => {
            logOut();
            navigate("/");
          }}
          className={styles.exit_button}
        >
          Выйти
        </button>
      </div>
    </div>
  ) : (
    <h4>Пользователь не авторизован</h4>
  );
};

export default ProfilePage;
