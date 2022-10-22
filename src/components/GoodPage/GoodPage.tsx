import styles from "./GoodPage.module.css";
import { IGood, IConfiguration } from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";

interface IGoodPageProps {
  good?: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
}

type SizeType = "SMALL" | "MEDIUM" | "BIG";

type SizeName = { [day in SizeType]: string };

const sizes: { [category: string]: SizeName } = {
  PIZZA: {
    SMALL: "Маленькая",
    MEDIUM: "Средняя",
    BIG: "Большая",
  },
  DEFAULT: {
    SMALL: "Маленький",
    MEDIUM: "Средний",
    BIG: "Большой",
  },
};

const getSizeName = (category: string, value: SizeType): string | undefined => {
  if (category in sizes) {
    return sizes[category][value];
  } else return sizes["DEFAULT"][value];
};

const url = "http://localhost:8000/api/add-to-cart/";

const addToCart = async (
  good: IGood | undefined,
  configuration: IConfiguration | undefined,
  token: string | undefined
) => {
  await axios
    .post(
      url,
      {
        good_id: good?.id,
        size: configuration?.size,
      },
      {
        headers: {
          Authorization: "Token " + token,
        },
      }
    )
    .catch(() => alert("Не удалось добавить товар в корзину"));
};

const GoodPage = ({ good, selectGood }: IGoodPageProps) => {
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
            {good?.configurations.map((config) => (
              <button
                className={config === goodConfig ? styles.active : undefined}
                onClick={() => setGoodConfig(config)}
                key={config.size}
              >
                {getSizeName(good?.category, config.size as SizeType)}
              </button>
            ))}
          </div>
          <button
            className={styles.add_to_cart}
            onClick={() =>
              addToCart(good, goodConfig, user?.token).then(() =>
                selectGood(undefined)
              )
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
