interface ICartProps {
    toggleCart: () => void
}

const Cart = ({ toggleCart }: ICartProps) => {
    return (
        <div id='cart'>
            <div className="cart-header">
                <h3>Корзина</h3>
                <img onClick={() => toggleCart()} src="close.png" alt="" />
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
}

export default Cart