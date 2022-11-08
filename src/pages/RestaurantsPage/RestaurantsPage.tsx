import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { axiosInstance } from "../../App";
import { IRestaurant } from "../../models";
import styles from "./RestaurantsPage.module.css";

interface IOrderConfirmationProps {
  city: string | undefined;
}

const RestaurantsPage = ({ city }: IOrderConfirmationProps) => {
  const [restaurants, setRestaurants] = useState<IRestaurant[] | undefined>();
  useEffect(() => {
    axiosInstance
      .get<IRestaurant[]>(`restaurants/${city}/`)
      .then((response) => setRestaurants(response.data));
  }, [city]);
  return (
    <div className={styles.restaurants_page}>
      <h3>Рестораны в городе {city}</h3>
      <div className={styles.restaurants}>
        {restaurants?.map((restaurant) => (
          <div key={restaurant.address.name}>
            <p>{restaurant.rating}</p>
            <p>
              <GrLocation /> {restaurant.address.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage;
