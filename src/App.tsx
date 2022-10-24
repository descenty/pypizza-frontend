import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/AppHeader";
import MainPage from "./pages/MainPage";
import LoginWindow from "./components/LoginWindow";
import UserContext from "./context/UserContext";
import { ICart, IUser } from "./models";
import axios from "axios";
import Cart from "./components/Cart/Cart";
import AppFooter from "./components/AppFooter";
import { getCart } from "./APIFunctions";

export const baseURL = "http://localhost:8000";

export const axiosInstance = axios.create({
  baseURL: baseURL + "/api/",
});

function App() {
  const [showLoginWindow, setLoginWindow] = useState<boolean>(false);
  const toggleLoginWindow = () => {
    setLoginWindow(!showLoginWindow);
  };
  const [cart, setCart] = useState<ICart | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const [user, setUser] = useState<IUser | null>();

  async function getUserData() {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
      try {
        const response = await axiosInstance.get<IUser>("user-data/", {
          headers: {
            Authorization: "Token " + token,
          },
        });
        setUser(Object.assign(response.data, { token: token }));
      } catch (e) {
        console.log("Cannot get user data");
      }
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateCart = () => getCart().then((cart) => setCart(cart));

  useEffect(() => {
    getUserData();
    updateCart();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppHeader
        toggleCart={toggleCart}
        toggleLoginWindow={toggleLoginWindow}
        logOut={logOut}
      />
      <MainPage updateCart={updateCart} />
      {showLoginWindow && (
        <LoginWindow
          toggleLoginWindow={toggleLoginWindow}
          getUserData={getUserData}
        />
      )}
      <Cart toggleCart={toggleCart} showCart={showCart} cart={cart} />
      <AppFooter />
    </UserContext.Provider>
  );
}

export default App;
