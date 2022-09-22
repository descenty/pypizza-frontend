import React from "react";

interface ILoginWindowContext {
    showLoginWindow: boolean;
    toggleLoginWindow: () => void;
}

const LoginWindowContext = React.createContext<ILoginWindowContext>({
    showLoginWindow: false,
    toggleLoginWindow() { }
})

export default LoginWindowContext