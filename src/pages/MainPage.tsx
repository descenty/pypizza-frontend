import axios from "axios"
import { useEffect, useState } from "react"
import GoodCard from "../components/GoodCard"
import CircleLoader from "../components/Loader/CircleLoader"
import { IGood } from "../models"

const MainPage = () => {
    const [goods, setGoods] = useState<IGood[] | null>(null)
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState<boolean>(true)
    const url = 'http://localhost:8000/api/goods/'

    async function fetchGoods() {
        try {
            const response = await axios.get<IGood[]>(url)
            setGoods(response.data)
        }
        catch (e) {
            setError("Не удалось загрузить пиццу")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchGoods()
    }, [])

    return (
        <section>
            {isLoading && <CircleLoader />}
            {error && <h3>{error}</h3>}
            {goods?.map(good => <GoodCard good={good} key={good.id} />)}
        </section>
    )
}

export default MainPage