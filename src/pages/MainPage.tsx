import axios from "axios";
import { useEffect, useState } from "react";
import GoodCard from "../components/GoodCard";
import CircleLoader from "../components/Loader/CircleLoader";
import Advertisments from "../components/Advertisments/Advertisments";
import { IGood } from "../models";
import Categories from "../components/Categories/Categories";
import GoodPage from "../components/GoodPage/GoodPage";

const MainPage = () => {
  const [goods, setGoods] = useState<IGood[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedGood, selectGood] = useState<IGood>();
  const url = "http://localhost:8000/api/goods/";

  async function fetchGoods() {
    try {
      const response = await axios.get<IGood[]>(url);
      setGoods(response.data);
    } catch (e) {
      setError("Не удалось загрузить пиццу");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchGoods();
  }, []);

  return (
    <>
      <Advertisments />
      <Categories />
      {selectedGood && <GoodPage good={selectedGood} selectGood={selectGood} />}
      <section id="restaurants">
        {isLoading && <CircleLoader />}
        {error && <h3>{error}</h3>}
        <div>
          {goods?.map((good) => (
            <GoodCard good={good} selectGood={selectGood} key={good.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainPage;
