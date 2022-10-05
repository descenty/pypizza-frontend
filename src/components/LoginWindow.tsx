import axios from "axios";
import { useContext, useState } from "react";
import LoginWindowContext from "../context/LoginWindowContext";
import { IToken } from "../models";

interface ILoginWindowProps {
    getUserData: () => Promise<void>
}

const LoginWindow = ({getUserData}: ILoginWindowProps) => {
    const { showLoginWindow, toggleLoginWindow } = useContext(LoginWindowContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    async function authenticate() {
        try {
            const response = await axios.post<IToken>('http://localhost:8000/api/token-auth/', {
                username: username,
                password: password
            })
            localStorage.setItem('token', response.data.token)
            toggleLoginWindow?.();
            await getUserData()
        }
        catch {
            alert('Войти не удалось')
        }
    }
    if (showLoginWindow)
        return (
            <div id="login-panel" >
                <div>
                    <div>
                        <h2>Вход</h2>
                        <img onClick={() => toggleLoginWindow?.()} src="close.png" alt="" />
                    </div>
                    <div>
                        <input onChange={event => setUsername(event.target.value)} value={username} placeholder="Номер телефона" />
                        <input onChange={event => setPassword(event.target.value)} value={password} type="password" placeholder="Пароль" />
                        <button onClick={async () => await authenticate()}>Войти</button>
                    </div>
                </div>
            </div >
        )
    else return(<></>);
}

export default LoginWindow;