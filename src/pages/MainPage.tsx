import axios from "axios"
import { useEffect, useState } from "react"
import PizzaCard from "../components/PizzaCard"
import { IPizza } from "../models"

const MainPage = () => {
    const [pizzas, setPizzas] = useState<IPizza[]>([])
    const url = 'http://localhost:8000/api/pizza/'

    async function fetchPizzas() {
        try {
            const response = await axios.get<IPizza[]>(url)
            setPizzas(response.data)
        }
        catch (e) {
            console.log('Не удалось загрузить пиццу')
        }

    }

    useEffect(() => {
        fetchPizzas()
    }, [])

    return (
        <section>
            {pizzas.map(pizza => <PizzaCard pizza={pizza} key={pizza.id} />)}
        </section>
    )
}

export default MainPage