import { IGood } from "../models";

interface IGoodCardProps {
    good: IGood
}

const PizzaCard = ({ good }: IGoodCardProps) => {
    return (
        <div className="good-card">
            <div className="good-info">
                <img src={good.image} alt={good.name}/>
                <h3>{good.name}</h3>
                <p>{good.description}</p>
            </div>
            <div className="add-to-cart">
                <span>от 289 ₽</span>
                <button>Добавить</button>
            </div>
        </div>
    );
};

export default PizzaCard