import React from "react";

interface ILoginWindowContext {
    showLoginWindow?: boolean;
    toggleLoginWindow?: () => void;
}

const LoginWindowContext = React.createContext<ILoginWindowContext>({})

export default LoginWindowContext