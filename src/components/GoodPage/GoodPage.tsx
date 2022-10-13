import styles from "./GoodPage.module.css";
import { IGood } from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface IGoodPageProps {
  good?: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
}

const GoodPage = ({ good, selectGood }: IGoodPageProps) => {
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
            <button>Маленькая</button>
            <button>Средняя</button>
            <button>Большая</button>
          </div>
          <button className={styles.add_to_cart}>
            Добавить в корзину за 519 ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoodPage;
