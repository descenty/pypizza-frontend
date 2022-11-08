import axios from "axios";
import { useEffect, useState } from "react";
import GoodCard from "../components/GoodCard";
import CircleLoader from "../components/Loader/CircleLoader";
import Advertisments from "../components/Advertisments/Advertisments";
import { Category, ICart, IGood } from "../models";
import Categories from "../components/Categories/Categories";
import GoodPage from "../components/GoodPage/GoodPage";
import { axiosInstance } from "../App";

interface IMainPageProps {
  updateCart: () => Promise<void>;
  cart: ICart | null;
}

const MainPage = ({ cart, updateCart }: IMainPageProps) => {
  const [goods, setGoods] = useState<IGood[] | null>(null);
  const [error, setError] = useState("");
  const [selectedGood, selectGood] = useState<IGood>();
  const [category, setCategory] = useState<Category>("PIZZA");

  async function fetchGoods() {
    try {
      const response = await axiosInstance.get<IGood[]>("goods/");
      setGoods(response.data);
    } catch (e) {
      setError("Не удалось загрузить пиццу");
    }
  }

  useEffect(() => {
    fetchGoods();
  }, []);

  return (
    <>
      <Advertisments />
      <Categories categoryType={category} setCategoryType={setCategory} />
      {selectedGood && (
        <GoodPage
          good={selectedGood}
          selectGood={selectGood}
          cart={cart}
          updateCart={updateCart}
        />
      )}
      <section id="restaurants">
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
