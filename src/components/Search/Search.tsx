import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { AiOutlineSearch } from "react-icons/ai";
import { IGood } from "../../models";
import { goodsStore } from "../../stores/GoodsStore";
import styles from "./Search.module.css";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredGoods, setFilteredGoods] = useState<IGood[] | undefined>([]);
  useEffect(() => {
    if (searchValue.length >= 3) {
      setFilteredGoods(
        goodsStore.goods?.filter((good) =>
          good.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredGoods(undefined);
    }
  }, [searchValue]);
  return (
    <>
      <div className={styles.backdrop}></div>
      <div className={`${styles.search_div} ${styles.to_hide}`}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trim())}
          onBlur={() => setTimeout(() => setSearchValue(""), 500)}
          type="text"
          name="search"
          id="search"
          placeholder="Поиск"
        />
        <div className={styles.suggestions}>
          {filteredGoods?.map((good) => (
            <span key={good.id} onClick={() => goodsStore.selectGood(good)}>
              {good.name}
            </span>
          ))}
        </div>
        <AiOutlineSearch className={styles.search_icon} />
      </div>
    </>
  );
};

export default observer(Search);
