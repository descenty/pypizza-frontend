import axios from "axios"
import { useEffect, useState } from "react"
import GoodCard from "../components/GoodCard"
import { IGood } from "../models"

const MainPage = () => {
    const [goods, setGoods] = useState<IGood[]>([])
    const url = 'http://localhost:8000/api/goods/'

    async function fetchGoods() {
        try {
            const response = await axios.get<IGood[]>(url)
            setGoods(response.data)
        }
        catch (e) {
            console.log('Не удалось загрузить пиццу')
        }

    }

    useEffect(() => {
        fetchGoods()
    }, [])

    return (
        <section>
            {goods.map(good => <GoodCard good={good} key={good.id} />)}
        </section>
    )
}

export default MainPage