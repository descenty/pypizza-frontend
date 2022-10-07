import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/AppHeader';
import MainPage from './pages/MainPage'
import LoginWindow from './components/LoginWindow';
import UserContext from './context/UserContext';
import { IUser } from './models';
import axios from 'axios';
import Cart from './components/Cart';
import AppFooter from './components/AppFooter';

function App() {
  const [showLoginWindow, setLoginWindow] = useState<boolean>(false)
  const toggleLoginWindow = () => {
    setLoginWindow(!showLoginWindow)
  }
  const [showCart, setCart] = useState<boolean>(false)
  const toggleCart = () => {
    setCart(!showCart)
  }
  const [user, setUser] = useState<IUser | null>()

  async function getUserData() {
    if (localStorage.getItem('token')) {
      try {
        const response = await axios.get<IUser>('http://localhost:8000/api/user-data/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        })
        setUser(response.data)
      }
      catch (e) {
        console.log('Cannot get user data')
      }
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppHeader toggleCart={toggleCart} toggleLoginWindow={toggleLoginWindow} logOut={logOut}/>
      <MainPage />
      {showLoginWindow && <LoginWindow toggleLoginWindow={toggleLoginWindow} getUserData={getUserData} />}
      {showCart && <Cart toggleCart={toggleCart} />}
      <AppFooter />
    </UserContext.Provider>
  );
}

export default App;
