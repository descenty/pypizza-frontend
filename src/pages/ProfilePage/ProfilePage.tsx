import { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import UserContext from "../../context/UserContext";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.profile_div}>
      <h1>Личный кабинет</h1>
      <h2>{user?.phone}</h2>
      <h3 className={styles.bonus_points}>
        Бонусные баллы: &nbsp;{user?.bonus_points}&nbsp;
        <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
      </h3>
      <div>
        <h3>Потратить бонусы:</h3>
      </div>
      <div>
        <h3>Ваши заказы:</h3>
      </div>
      <div className={styles.addresses_div}>
        <h3>Сохранённые адреса:</h3>
        {user?.saved_addresses.map((saved_address) => (
          <div key={saved_address.name} className={styles.address}>
            <span>{saved_address.name}</span>
          </div>
        ))}
        <button>Добавить адрес</button>
      </div>
      <a href="/" onClick={() => localStorage.setItem("token", "")}>
        Выйти
      </a>
    </div>
  );
};

export default ProfilePage;
