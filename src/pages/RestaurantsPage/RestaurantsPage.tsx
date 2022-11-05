import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { axiosInstance } from "../../App";
import { IRestaurant } from "../../models";
import styles from "./RestaurantsPage.module.css";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[] | undefined>();
  useEffect(() => {
    axiosInstance
      .get<IRestaurant[]>(`restaurants/${localStorage.getItem("city")}/`)
      .then((response) => setRestaurants(response.data));
  }, [setRestaurants]);
  return (
    <div className={styles.restaurants_page}>
      <h3>Рестораны в городе {localStorage.getItem("city")}</h3>
      <div className={styles.restaurants}>
        {restaurants?.map((restaurant) => (
          <div key={restaurant.address.name}>
            <p>{restaurant.rating}</p>
            <p><GrLocation /> {restaurant.address.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;
