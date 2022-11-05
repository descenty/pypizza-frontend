import { Category, getSizeName, IGood, SizeType } from "../models";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { Dispatch, SetStateAction, useContext } from "react";
import UserContext from "../context/UserContext";

interface IGoodCardProps {
  good: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
}

const GoodCard = ({ good, selectGood }: IGoodCardProps) => {
  const { user } = useContext(UserContext);
  return (
    <div
      className="restaurant-card"
      onClick={() => {
        user ? selectGood(good) : alert("Необходим вход");
      }}
    >
      <img src={good.image} alt="restaurant1" />
      {/* <span className="image-span">-10%</span> */}
      <div>
        <h3>{good.name}</h3>
        <div className="time-and-check">
          <p>{good.description}</p>
        </div>
        <div className="add-to-cart">
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
          {/* <button onClick={() => selectGood(good)}>Добавить</button> */}
        </div>
      </div>
    </div>
    /* <div className="good-card">
            <div className="good-info">
                <img src={good.image} alt={good.name}/>
                <h3>{good.name}</h3>
                <p>{good.description}</p>
            </div>
            <div className="add-to-cart">
                <span>от 289 ₽</span>
                <button>Добавить</button>
            </div>
        </div> */
  );
};

export default GoodCard;
