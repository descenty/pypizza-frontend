import { Category } from "./models"

interface ICategory {
    id: Category
    name: string
    imageUrl: string
}

const categories: ICategory[] = [
    {
        id: "PIZZA",
        name: 'Пицца',
        imageUrl: 'icons/pizza.png'
    },
    {
        id: "BURGERS",
        name: 'Бургеры',
        imageUrl: 'icons/burger.png'
    },
    {
        id: "DRINKS",
        name: "Напитки",
        imageUrl: 'icons/drink.png'
    },
    {
        id: "DESERTS",
        name: 'Десерты',
        imageUrl: 'icons/cupcake.png'
    }
]

export default categories