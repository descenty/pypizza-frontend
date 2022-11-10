import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
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
import CitySelectWindow from "./components/CitySelectWindow/CitySelectWindow";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";
import CircleLoader from "./components/CircleLoader/CircleLoader";

// export const baseURL = "http://localhost:8000";
export const baseURL = "http://192.168.138.202:8000";

export const axiosInstance = axios.create({
  baseURL: baseURL + "/api/",
});
function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [city, setCity] = useState<string | undefined>();
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
  const [showCitySelectWindow, setShowCitySelectWindow] =
    useState<boolean>(false);
  const toggleCitySelectWindow = () => {
    setShowCitySelectWindow(!showCitySelectWindow);
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

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const logOut = () => {
    toggleLoading();
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateCart = () => getCart().then((cart) => setCart(cart));

  useEffect(() => {
    !user ? getUserData() : updateCart();
    setTimeout(() => setLoading(false), 500);
  }, [user]);

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        axios
          .get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=879b6e4ef63abefd6fa01b2a25c7999a&`
          )
          .then((response) => setCity(response.data[0].local_names.ru));
      },
      () => {
        console.log("Failed to get location data");
        setCity("Москва");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };
  useEffect(() => {
    city && localStorage.setItem("city", city);
  }, [city]);
  useEffect(() => {
    setTimeout(() => !city && getGeolocation(), 1000);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppHeader
          setLoading={setLoading}
          toggleCart={toggleCart}
          showCart={showCart}
          setShowCart={setShowCart}
          toggleLoginWindow={toggleLoginWindow}
          toggleCitySelectWindow={toggleCitySelectWindow}
          cart={cart}
          city={city}
        />
        {showLoginWindow && (
          <LoginWindow
            toggleLoginWindow={toggleLoginWindow}
            getUserData={getUserData}
            setLoading={setLoading}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={<MainPage cart={cart} updateCart={updateCart} />}
          />
          <Route
            path="profile/"
            element={
              <ProfilePage
                logOut={logOut}
                toggleNewAddressPage={toggleNewAddressPage}
              />
            }
          />
          <Route
            path="payment-confirmation/:id/"
            element={
              <PaymentConfirmation
                updateUserData={getUserData}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="orders/"
            element={
              <ActiveOrderPage
                updateUserData={getUserData}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="restaurants/"
            element={<RestaurantsPage city={city} />}
          />
        </Routes>
        <CircleLoader isLoading={isLoading} />
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
        <CitySelectWindow
          toggleCitySelectWindow={toggleCitySelectWindow}
          showCitySelectWindow={showCitySelectWindow}
          setCity={setCity}
        />
        <AppFooter />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
