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
import { axiosInstance } from "../../settings";
import { addToCart } from "../../APIFunctions";
import { goodsStore } from "../../stores/GoodsStore";
import { observer } from "mobx-react";

interface IGoodPageProps {
  updateCart: () => Promise<void>;
  cart: ICart | null;
}

const GoodPage = ({ cart, updateCart }: IGoodPageProps) => {
  const { selectedGood, selectGood } = goodsStore;
  const [goodConfig, setGoodConfig] = useState<IConfiguration | undefined>(
    selectedGood?.configurations[0]
  );
  const [disableButton, setDisableButton] = useState<boolean>(false);
  useEffect(() => {
    if (
      cart &&
      cart.cart_goods.some(
        (cart_good) => cart_good.good.id === selectedGood?.id
      ) &&
      cart.cart_goods.find(
        (cart_good) => cart_good.good.id === selectedGood?.id
      )!.quantity >= 10
    ) {
      selectGood(null);
      alert(`Нельзя добавить больше 10 ${selectedGood?.name}`);
    }
    setGoodConfig(selectedGood?.configurations[0]);
    document.querySelector("body")!.style.overflow = selectedGood
      ? "hidden"
      : "scroll";
  }, [cart, selectedGood, selectGood]);
  return (
    <div
      className={`${styles.good_page} ${
        selectedGood ? styles.open : styles.close
      }`}
    >
      <div
        className={`backtrigger ${styles.backtrigger} ${
          selectedGood ? styles.open : styles.close
        } `}
        onClick={() => selectGood(null)}
      ></div>
      <div>
        <button
          className={styles.close_button}
          onClick={() => selectGood(null)}
        >
          <AiOutlineClose className={styles.close_button} />
        </button>
        <img src={selectedGood?.image} alt="good" />
        <div>
          <h2>{selectedGood?.name}</h2>
          <p>{selectedGood?.description}</p>
          <div className={styles.configurations}>
            {selectedGood?.configurations.map(
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
                      selectedGood?.category as Category,
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
                  addToCart(selectedGood!, goodConfig).then(() => {
                    selectGood(null);
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
  );
};

export default observer(GoodPage);
