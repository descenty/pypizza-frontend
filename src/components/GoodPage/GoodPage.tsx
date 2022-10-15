import styles from "./GoodPage.module.css";
import { IGood, IConfiguration } from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from "react";

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
const GoodPage = ({ good, selectGood }: IGoodPageProps) => {
  const [goodConfig, setGoodConfig] = useState<IConfiguration | undefined>(
    good?.configurations[0]
  );
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
          <button className={styles.add_to_cart}>
            Добавить в корзину за {goodConfig?.price} ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoodPage;
