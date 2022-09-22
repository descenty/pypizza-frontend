import { useContext } from "react";
import LoginWindowContext from "../context/LoginWindowContext";
import UserContext from "../context/UserContext";

const AppHeader = () => {
    const {toggleLoginWindow} = useContext(LoginWindowContext)
    const {user} = useContext(UserContext)
    return (
        <header>
            <div>
                <h1>PyPizza</h1>
                <a>г. Москва</a>
                <a onClick={() => toggleLoginWindow()}>{user && user.phone}</a>
                <a>Корзина</a>
            </div>
            <nav>
                <a href="">Пицца</a>
                <a href="">Закуски</a>
                <a href="">Десерты</a>
                <a href="">Напитки</a>
                <a href="">Акции</a>
                <a href="">О проекте</a>
                <a href="http://127.0.0.1:8000/admin/">Админ-панель</a>
            </nav>
        </header >
    );
};

export default AppHeader;
