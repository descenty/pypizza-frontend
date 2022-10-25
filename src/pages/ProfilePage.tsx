import { useContext } from "react";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import UserContext from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h2>{user?.phone}</h2>
      <h2>
        {user?.bonus_points}{" "}
        <VscDebugBreakpointLogUnverified></VscDebugBreakpointLogUnverified>
      </h2>
      <h3>Сохранённые адреса:</h3>
      <div>
        {user?.saved_addresses.map((saved_address) => (
          <span>{saved_address.name}</span>
        ))}
        <button>Добавить адрес</button>
      </div>
      <h3>Ваши заказы:</h3>
      <h3>Потратить бонусы:</h3>
      <div>
        
      </div>
      <a href="/" onClick={() => localStorage.setItem("token", "")}>
        Выйти
      </a>
    </>
  );
};

export default ProfilePage;
