import axios from "axios";
import { useEffect, useState } from "react";
import GoodCard from "../components/GoodCard";
import CircleLoader from "../components/Loader/CircleLoader";
import Advertisments from "../components/Advertisments/Advertisments";
import { Category, ICart, IGood } from "../models";
import Categories from "../components/Categories/Categories";
import GoodPage from "../components/GoodPage/GoodPage";

interface IMainPageProps {
  updateCart: () => Promise<void>;
}

const MainPage = ({ updateCart }: IMainPageProps) => {
  const [goods, setGoods] = useState<IGood[] | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedGood, selectGood] = useState<IGood>();
  const [category, setCategory] = useState<Category>("PIZZA");
  const url = "http://localhost:8000/api/goods/";

  async function fetchGoods() {
    try {
      const response = await axios.get<IGood[]>(url);
      setGoods(response.data);
    } catch (e) {
      setError("Не удалось загрузить пиццу");
    }
  }

  useEffect(() => {
    fetchGoods();
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      <Advertisments />
      <Categories categoryType={category} setCategoryType={setCategory} />
      {selectedGood && (
        <GoodPage
          good={selectedGood}
          selectGood={selectGood}
          updateCart={updateCart}
        />
      )}
      <section id="restaurants">
        <CircleLoader isLoading={isLoading} />
        {error && <h3>{error}</h3>}
        <div>
          {goods?.map(
            (good) =>
              (category === "DEFAULT" || category === good.category) && (
                <GoodCard good={good} selectGood={selectGood} key={good.id} />
              )
          )}
        </div>
      </section>
    </>
  );
};

export default MainPage;
