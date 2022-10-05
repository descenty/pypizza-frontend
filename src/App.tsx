import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/AppHeader';
import MainPage from './pages/MainPage'
import LoginWindow from './components/LoginWindow';
import LoginWindowContext from './context/LoginWindowContext';
import UserContext from './context/UserContext';
import CartWindowContext from './context/CartWindowContext';
import { IUser } from './models';
import axios from 'axios';
import Cart from './components/Cart';
import AppFooter from './components/AppFooter';

function App() {
  const [showLoginWindow, setLoginWindow] = useState<boolean>(false)
  const toggleLoginWindow = () => {
    setLoginWindow(!showLoginWindow)
  }
  const [showCartWindow, setCartWindow] = useState<boolean>(false)
  const toggleCartWindow = () => {
    setCartWindow(!showCartWindow)
  }
  const [user, setUser] = useState<IUser>()

  async function getUserData() {
    const response = await axios.get<IUser>('http://localhost:8000/api/user-data/', {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    })
    setUser(response.data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoginWindowContext.Provider value={{ showLoginWindow, toggleLoginWindow }}>
        <CartWindowContext.Provider value={{ showCartWindow, toggleCartWindow }}>
          <AppHeader />
          <MainPage />
          <LoginWindow getUserData={getUserData} />
          <Cart />
          <AppFooter />
        </CartWindowContext.Provider>
      </LoginWindowContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
