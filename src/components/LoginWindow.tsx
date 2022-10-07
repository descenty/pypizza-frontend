import axios from "axios";
import { useContext, useState } from "react";
import { IToken } from "../models";

interface ILoginWindowProps {
    getUserData: () => Promise<void>
    toggleLoginWindow: () => void
}

interface ILoginFormData {
    username: string
    password: string
}

const LoginWindow = ({getUserData, toggleLoginWindow}: ILoginWindowProps) => {
    const [loginFormData, setLoginFormData] = useState<ILoginFormData>({
        username: '',
        password: ''
    })
    // const [username, setUsername] = useState<string>('')
    // const [password, setPassword] = useState<string>('')


    async function authenticate() {
        try {
            const response = await axios.post<IToken>('http://localhost:8000/api/token-auth/', loginFormData)
            localStorage.setItem('token', response.data.token)
            toggleLoginWindow();
            await getUserData()
        }
        catch {
            alert('Войти не удалось')
        }
    }
    return (
        <div id="login-panel" >
            <div>
                <div>
                    <h2>Вход</h2>
                    <img onClick={() => toggleLoginWindow()} src="close.png" alt="" />
                </div>
                <div>
                    <input onChange={event => setLoginFormData({ ...loginFormData, username: event.target.value })} value={loginFormData.username} placeholder="Номер телефона" />
                    <input onChange={event => setLoginFormData({ ...loginFormData, password: event.target.value })} value={loginFormData.password} type="password" placeholder="Пароль" />
                    <button onClick={async () => await authenticate()}>Войти</button>
                </div>
            </div>
        </div >
    )
}

export default LoginWindow;