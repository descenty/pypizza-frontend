import { useContext } from "react";
import UserContext from "../context/UserContext";
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai'

interface IAppHeaderProps {
    toggleLoginWindow: () => void
    toggleCart: () => void
    logOut: () => void
}

const AppHeader = ({ toggleLoginWindow, toggleCart, logOut }: IAppHeaderProps) => {
    const { user } = useContext(UserContext)
    return (
        <header>
            <div>
                <h2>py<br /><span>pizza</span></h2>
                <div className="search-div">
                    <input type="text" name="search" id="search" placeholder="Поиск" />
                    <AiOutlineSearch className="search-icon" />
                </div>
            </div>
            <div>
                <a href="#">Акции</a>
                <a href="#">Рестораны</a>
                <a href="#">Мои заказы</a>
                <button id="cart-button" onClick={() => toggleCart()}>
                    <AiOutlineShopping className="cart-image" />
                    <span className="cart-span">4</span>
                </button>
                <button id="user-button" onClick={() => toggleLoginWindow()}>
                    {/* <i className="fi fi-rr-user"></i> */}
                    <img src="afro.jpg" alt="user" />
                </button>
            </div>
        </header>
        // <header>
        //     <div>
        //         <h1>PyPizza</h1>
        //         <a>г. Москва</a>
        //         <a onClick={() => toggleLoginWindow()}>{user ? user.phone : 'Войти'}</a>
        //         {user && <a onClick={() => logOut()}>Выйти</a>}
        //         <a onClick={() => toggleCart()}>Корзина</a>
        //     </div>
        //     <nav>
        //         <a href="">Пицца</a>
        //         <a href="">Закуски</a>
        //         <a href="">Десерты</a>
        //         <a href="">Напитки</a>
        //         <a href="">Акции</a>
        //         <a href="">О проекте</a>
        //         <a href="http://127.0.0.1:8000/admin/">Админ-панель</a>
        //     </nav>
        // </header >
    );
};

export default AppHeader;
