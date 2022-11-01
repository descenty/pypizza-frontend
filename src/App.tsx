import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/AppHeader";
import MainPage from "./pages/MainPage";
import LoginWindow from "./components/LoginWindow/LoginWindow";
import UserContext from "./context/UserContext";
import { ICart, IUser } from "./models";
import axios from "axios";
import Cart from "./components/Cart/Cart";
import AppFooter from "./components/AppFooter";
import { getCart } from "./APIFunctions";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrderConfirmation from "./components/OrderConfirmation/OrderConfirmation";
import NewAddressPage from "./components/NewAddressPage/NewAddressPage";
import PaymentConfirmation from "./components/PaymentConfirmation/PaymentConfirmation";
import ActiveOrderPage from "./pages/OrdersPage/ActiveOrderPage";

// export const baseURL = "http://localhost:8000";
export const baseURL = "http://192.168.0.101:8000";

export const axiosInstance = axios.create({
  baseURL: baseURL + "/api/",
});

function App() {
  const [showLoginWindow, setLoginWindow] = useState<boolean>(false);
  const toggleLoginWindow = () => {
    setLoginWindow(!showLoginWindow);
    document.querySelector("body")!.style.overflow = !showLoginWindow
      ? "hidden"
      : "scroll";
  };
  const [cart, setCart] = useState<ICart | null>(null);
  const [showCart, setShowCart] = useState<boolean>(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const [showOrderConfirmation, setShowOrderConfirmation] =
    useState<boolean>(false);
  const toggleOrderConfirmation = () => {
    setShowOrderConfirmation(!showOrderConfirmation);
  };
  const [showNewAddressPage, setShowNewAddressPage] = useState<boolean>(false);
  const toggleNewAddressPage = () => {
    setShowNewAddressPage(!showNewAddressPage);
  };
  const [user, setUser] = useState<IUser | null>();

  async function getUserData() {
    let token;
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
      try {
        const response = await axiosInstance.get<IUser>("user-data/");
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
    !user ? getUserData() : updateCart();
  }, [user]);

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        axios
          .get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=879b6e4ef63abefd6fa01b2a25c7999a&`
          )
          .then((response) =>
            localStorage.setItem("city", response.data[0].local_names.ru)
          );
      },
      () => alert("Failed to get location data"),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    !localStorage.getItem("city") && getGeolocation();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppHeader
          toggleCart={toggleCart}
          setShowCart={setShowCart}
          toggleLoginWindow={toggleLoginWindow}
          logOut={logOut}
          cart={cart}
        />
        {showLoginWindow && (
          <LoginWindow
            toggleLoginWindow={toggleLoginWindow}
            getUserData={getUserData}
          />
        )}
        <Routes>
          <Route path="/" element={<MainPage updateCart={updateCart} />} />
          <Route
            path="profile/"
            element={
              <ProfilePage toggleNewAddressPage={toggleNewAddressPage} />
            }
          />
          <Route
            path="payment-confirmation/:id/"
            element={<PaymentConfirmation />}
          />
          <Route path="orders/" element={<ActiveOrderPage />} />
        </Routes>
        <Cart
          toggleCart={toggleCart}
          showCart={showCart}
          cart={cart}
          updateCart={updateCart}
          toggleOrderConfirmation={toggleOrderConfirmation}
        />
        <OrderConfirmation
          toggleOrderConfirmation={toggleOrderConfirmation}
          showOrderConfirmation={showOrderConfirmation}
          toggleNewAddressPage={toggleNewAddressPage}
        />
        <NewAddressPage
          toggleNewAddressPage={toggleNewAddressPage}
          showNewAddressPage={showNewAddressPage}
        />
        <AppFooter />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
