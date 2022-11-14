import { Category, getSizeName, IGood, SizeType } from "../../models";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../../context/UserContext";
import styles from './GoodCard.module.css'

interface IGoodCardProps {
  good: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
}

const GoodCard = ({ good, selectGood }: IGoodCardProps) => {
  const { user } = useContext(UserContext);
  return (
    <div
      className={styles.good_card}
      onClick={() => {
        user ? selectGood(good) : alert("Необходим вход");
      }}
    >
      <img src={good.image} alt="изображение товара" />
      {/* <span className={styles.image_span}>-10%</span> */}
      <div>
        <h3>{good.name}</h3>
        <div>
          <p>{good.description}</p>
        </div>
        <div className={styles.add_to_cart}>
          <span>
            {getSizeName(
              good.category as Category,
              good.configurations.filter(
                (config) => config.size === "SMALL" || config.size === "DEFAULT"
              )[0].size as SizeType
            )}
          </span>
          <span>
            от {Math.min(...good.configurations.map((config) => config.price))}
            &nbsp;₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default GoodCard;
