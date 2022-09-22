import { IPizza } from "../models";

interface IPizzaCardProps {
    pizza: IPizza
}

const PizzaCard = ({ pizza }: IPizzaCardProps) => {
    return (
        <div className="pizza-card">
            <div className="pizza-info">
                <img src={pizza.image} alt={pizza.name}/>
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
            </div>
            <div className="buy-pizza">
                <span>от 289 ₽</span>
                <button>Выбрать</button>
            </div>
        </div>
    );
};

export default PizzaCard