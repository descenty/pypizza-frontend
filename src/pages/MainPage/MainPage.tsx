import { Dispatch, SetStateAction, useState } from "react";
import GoodCard from "../../components/GoodCard/GoodCard";
import Advertisments from "../../components/Advertisments/Advertisments";
import { Category, ICart } from "../../models";
import Categories from "../../components/Categories/Categories";
import GoodPage from "../../components/GoodPage/GoodPage";
import styles from "./MainPage.module.css";
import { goodsStore } from "../../stores/GoodsStore";
import { observer } from "mobx-react";

interface IMainPageProps {
  updateCart: () => Promise<void>;
  cart: ICart | null;
  showLoginWindow: Dispatch<SetStateAction<boolean>>;
}

const MainPage = ({ cart, updateCart, showLoginWindow }: IMainPageProps) => {
  const [category, setCategory] = useState<Category>("PIZZA");
  return (
    <>
      <Advertisments />
      <Categories categoryType={category} setCategoryType={setCategory} />
      <GoodPage cart={cart} updateCart={updateCart} />
      <section className={styles.goods}>
        {/* {error && <h3>{error}</h3>} */}
        <div>
          {goodsStore.goods?.map(
            (good) =>
              (category === "DEFAULT" || category === good.category) && (
                <GoodCard good={good} key={good.id} showLoginWindow={showLoginWindow} />
              )
          )}
        </div>
      </section>
    </>
  );
};

export default observer(MainPage);
