interface ICategory {
    name: string
    imageUrl: string
}

const categories: ICategory[] = [
    {
        name: 'Пицца',
        imageUrl: 'icons/pizza.png'
    },
    {
        name: 'Бургеры',
        imageUrl: 'icons/burger.png'
    },
    {
        name: "BBQ",
        imageUrl: 'icons/bbq.png'
    },
    {
        name: 'Десерты',
        imageUrl: 'icons/cupcake.png'
    }
]

export default categories