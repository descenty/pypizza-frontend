import styles from "./GoodPage.module.css";
import {
  IGood,
  IConfiguration,
  getSizeName,
  SizeType,
  Category,
} from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../App";
import { addToCart } from "../../APIFunctions";

interface IGoodPageProps {
  good?: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
  updateCart: () => Promise<void>;
}

const GoodPage = ({ good, selectGood, updateCart }: IGoodPageProps) => {
  const [goodConfig, setGoodConfig] = useState<IConfiguration | undefined>(
    good?.configurations[0]
  );
  const { user } = useContext(UserContext);
  return (
    <div className={styles.good_page}>
      <div>
        <button
          className={styles.close_button}
          onClick={() => selectGood(undefined)}
        >
          <AiOutlineClose className={styles.close_button} />
        </button>
        <img src={good?.image} alt="good" />
        <div>
          <h2>{good?.name}</h2>
          <p>{good?.description}</p>
          <div className={styles.configurations}>
            {good?.configurations.map(
              (config) =>
                config.size !== "DEFAULT" && (
                  <button
                    className={
                      config === goodConfig ? styles.active : undefined
                    }
                    onClick={() => setGoodConfig(config)}
                    key={config.size}
                  >
                    {getSizeName(
                      good?.category as Category,
                      config.size as SizeType
                    )}
                  </button>
                )
            )}
          </div>
          <button
            className={styles.add_to_cart}
            onClick={() =>
              addToCart(good, goodConfig).then(() => {
                selectGood(undefined);
                updateCart();
              })
            }
          >
            Добавить в корзину за {goodConfig?.price} ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoodPage;
