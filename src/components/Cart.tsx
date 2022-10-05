import axios from "axios";
import { useContext, useState } from "react";
import CartWindowContext from "../context/CartWindowContext";
import { IToken } from "../models";

const Cart = () => {
    const { showCartWindow, toggleCartWindow } = useContext(CartWindowContext);
    if (showCartWindow)
        return (
            <div id='cart'>
                <div className="cart-header">
                    <h3>Корзина</h3>
                    <img onClick={() => toggleCartWindow?.()} src="close.png" alt="" />
                </div>
                <div className="cart-goods">
                    <div>
                        <img src='pepperoni fresh.png' />
                        <div>
                            <h4>Пепперони фреш</h4>
                            <span>Средняя, 30 см.</span>
                        </div>
                        <span className="good-quantity">3</span>
                    </div>
                </div>

            </div>
        )
    else return (<></>)
}

export default Cart