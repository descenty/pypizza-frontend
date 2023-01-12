import styles from "./GoodPage.module.css";
import {
  IConfiguration,
  getSizeName,
  SizeType,
  Category,
  ICart,
} from "../../models";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { addToCart } from "../../APIFunctions";
import { goodsStore } from "../../stores/GoodsStore";
import { observer } from "mobx-react";

interface IGoodPageProps {
  updateCart: () => Promise<void>;
  cart: ICart | null;
}

const GoodPage = ({ cart, updateCart }: IGoodPageProps) => {
  const { selectedGood, selectGood, showGoodWindow } = goodsStore;
  const [goodConfig, setGoodConfig] = useState<IConfiguration | undefined>(
    selectedGood?.configurations[0]
  );
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const addToCartButtonClick = useCallback(() => {
    setDisableButton(true);
    setTimeout(() => {
      const selectedGoodInCart = cart?.cart_goods.find(
        (cart_good) => cart_good.good.id === selectedGood?.id
      );
      if (selectedGoodInCart && selectedGoodInCart.quantity >= 10) {
        selectGood(null);
        alert(`Нельзя добавить больше 10 ${selectedGood?.name}`);
      } else {
        addToCart(selectedGood!, goodConfig).then(() => {
          selectGood(null);
          updateCart();
        });
      }
      setDisableButton(false);
    }, 500);
  }, [cart?.cart_goods, selectedGood, selectGood, goodConfig, updateCart]);

  useEffect(() => {
    setGoodConfig(selectedGood?.configurations[0]);
    document.querySelector("body")!.style.overflow = selectedGood
      ? "hidden"
      : "scroll";
  }, [cart, selectedGood, selectGood]);

  const keyboardActions = useMemo(
    () => ({
      Enter: () => addToCartButtonClick(),
      Escape: () => selectGood(null),
      ArrowLeft: () =>
        selectedGood?.configurations[0] !== goodConfig &&
        setGoodConfig(
          selectedGood?.configurations[
            selectedGood?.configurations.indexOf(goodConfig!) - 1
          ]
        ),
      ArrowRight: () =>
        selectedGood?.configurations[selectedGood.configurations.length - 1] !==
          goodConfig &&
        setGoodConfig(
          selectedGood?.configurations[
            selectedGood?.configurations.indexOf(goodConfig!) + 1
          ]
        ),
    }),
    [addToCartButtonClick, goodConfig, selectGood, selectedGood?.configurations]
  );

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      Object.keys(keyboardActions).includes(event.key) &&
        keyboardActions[event.key as keyof typeof keyboardActions]();
    },
    [keyboardActions]
  );

  useEffect(() => {
    showGoodWindow
      ? document.addEventListener("keydown", handleKeyboardEvent)
      : document.removeEventListener("keydown", handleKeyboardEvent);
    return () => document.removeEventListener("keydown", handleKeyboardEvent);
  }, [handleKeyboardEvent, showGoodWindow]);

  return (
    <div
      className={[
        styles.good_page,
        showGoodWindow ? styles.open : styles.close,
      ].join(" ")}
    >
      <div
        className={[
          "backtrigger",
          styles.backtrigger,
          showGoodWindow ? styles.open : styles.close,
        ].join(" ")}
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
            onClick={addToCartButtonClick}
          >
            Добавить в корзину за {goodConfig?.price} ₽
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(GoodPage);
