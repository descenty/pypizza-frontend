import React from "react";

interface ICartWindowContext {
    showCartWindow?: boolean;
    toggleCartWindow?: () => void;
}

const CartWindowContext = React.createContext<ICartWindowContext>({})

export default CartWindowContext