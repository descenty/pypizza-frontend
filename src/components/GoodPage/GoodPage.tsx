import styles from "./GoodPage.module.css";
import {
  IGood,
  IConfiguration,
  getSizeName,
  SizeType,
  Category,
  ICart,
} from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { axiosInstance } from "../../App";
import { addToCart } from "../../APIFunctions";

interface IGoodPageProps {
  good?: IGood;
  selectGood: Dispatch<SetStateAction<IGood | undefined>>;
  updateCart: () => Promise<void>;
  cart: ICart | null;
}

const GoodPage = ({ good, selectGood, cart, updateCart }: IGoodPageProps) => {
  const [goodConfig, setGoodConfig] = useState<IConfiguration | undefined>(
    good?.configurations[0]
  );
  const [disableButton, setDisableButton] = useState<boolean>(false);
  useEffect(() => {
    if (
      cart &&
      cart.cart_goods.some((cart_good) => cart_good.good.id === good?.id) &&
      cart.cart_goods.find((cart_good) => cart_good.good.id === good?.id)!
        .quantity >= 10
    ) {
      selectGood(undefined);
      alert(`Нельзя добавить больше 10 ${good?.name}`);
    }
    setGoodConfig(good?.configurations[0]);
    document.querySelector("body")!.style.overflow = good
    ? "hidden"
    : "scroll";
  }, [cart, good, selectGood]);
  return (
    <>
      <div
        className={`${styles.good_page} ${good ? styles.open : styles.close}`}
      >
        <div
          className={`backtrigger ${styles.backtrigger} ${
            good ? styles.open : styles.close
          } `}
          onClick={() => selectGood(undefined)}
        ></div>
        <div>
          <button
            className={styles.close_button}
            onClick={() => selectGood(undefined)}
          >
            <AiOutlineClose className={styles.close_button} />
          </button>
          <img src={good?.image} alt="good" />
          <div>
            <h2>{good?.name}</h2>
            <p>{good?.description}</p>
            <div className={styles.configurations}>
              {good?.configurations.map(
                (config) =>
                  config.size !== "DEFAULT" && (
                    <button
                      className={
                        config === goodConfig ? styles.active : undefined
                      }
                      onClick={() => setGoodConfig(config)}
                      key={config.size}
                    >
                      {getSizeName(
                        good?.category as Category,
                        config.size as SizeType
                      )}
                    </button>
                  )
              )}
            </div>
            <button
              className={styles.add_to_cart}
              disabled={disableButton}
              onClick={() => {
                setDisableButton(true);
                setTimeout(
                  () =>
                    addToCart(good, goodConfig).then(() => {
                      selectGood(undefined);
                      updateCart();
                      setDisableButton(false);
                    }),
                  500
                );
              }}
            >
              Добавить в корзину за {goodConfig?.price} ₽
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodPage;
