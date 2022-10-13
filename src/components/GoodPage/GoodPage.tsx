import styles from "./GoodPage.module.css";
import { IGood } from "../../models";

interface IGoodPageProps {
  good?: IGood;
}

const GoodPage = ({ good }: IGoodPageProps) => {
  return (
    <div className={styles.good_page}>
      <div>
        <img src={good?.image} alt="good" />
        <div>
          <h2>{good?.name}</h2>
          <p>{good?.description}</p>
          <div className="configurations">
            <button>Маленькая</button>
            <button>Средняя</button>
            <button>Большая</button>
          </div>
          <button>Добавить в корзину за 519 ₽</button>
        </div>
      </div>
    </div>
  );
};

export default GoodPage;
