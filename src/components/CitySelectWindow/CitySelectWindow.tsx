import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { axiosInstance } from "../../App";
import { ICity } from "../../models";
import styles from "./CitySelectWindow.module.css";

interface ICitySelectWindowProps {
  toggleCitySelectWindow: () => void;
  showCitySelectWindow: boolean;
  setCity: Dispatch<SetStateAction<string | undefined>>;
}

const CitySelectWindow = ({
  toggleCitySelectWindow,
  showCitySelectWindow,
  setCity,
}: ICitySelectWindowProps) => {
  const [cities, setCities] = useState<ICity[] | undefined>();
  useEffect(() => {
    axiosInstance
      .get<ICity[]>("cities/")
      .then((response) => setCities(response.data));
  }, []);
  return (
    <div
      className={`${styles.order_confirmation} ${
        showCitySelectWindow ? styles.open : styles.close
      }`}
    >
      <div
        className="backtrigger"
        onClick={() => toggleCitySelectWindow()}
      ></div>
      <div>
        <h2>Выбор города</h2>
        <GrFormClose
          className={styles.close_button}
          onClick={() => toggleCitySelectWindow()}
        />
        <div className={styles.cities}>
          {cities?.map((city) => (
            <p
              key={city.name}
              onClick={() => {
                setCity(city.name);
                toggleCitySelectWindow();
              }}
            >
              {city.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelectWindow;
