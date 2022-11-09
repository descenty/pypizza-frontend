import { Category } from "./models"

interface ICategory {
    id: Category
    name: string
}

const categories: ICategory[] = [
    {
        id: "PIZZA",
        name: 'Пицца',
    },
    {
        id: "SNACKS",
        name: 'Закуски',
    },
    {
        id: "DRINKS",
        name: "Напитки",
    },
    {
        id: "DESERTS",
        name: 'Десерты',
    }
]

export default categories