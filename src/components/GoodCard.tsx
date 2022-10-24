import { IGood } from "../models";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";

interface IGoodCardProps {
  good: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
}

const PizzaCard = ({ good, selectGood }: IGoodCardProps) => {
  return (
    <div className="restaurant-card">
      <img src={good.image} alt="restaurant1" />
      {/* <span className="image-span">Featured</span> */}
      <div>
        <h3>{good.name}</h3>
        <div className="time-and-check">
          <p>{good.description}</p>
        </div>
        <div className="add-to-cart">
          <span>от 289 ₽</span>
          <button onClick={() => selectGood(good)}>Добавить</button>
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

export default PizzaCard;
