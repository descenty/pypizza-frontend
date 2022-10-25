import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <h2>{user?.phone}</h2>
      <h2>{user?.bonus_points}</h2>
      <h3>Ваши заказы:</h3>
      <h3>Потратить бонусы:</h3>
      <a href="/" onClick={() => localStorage.setItem("token", "")}>
        Выйти
      </a>
    </>
  );
};

export default ProfilePage;
