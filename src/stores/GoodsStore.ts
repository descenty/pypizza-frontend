import { action, autorun, makeObservable, observable } from "mobx";
import { axiosInstance } from "../settings";
import { IGood } from "../models";


class Store {
  constructor() {
    makeObservable(this, {
      goods: observable,
      selectedGood: observable,
      fetchGoods: action,
      setGoods: action,
      selectGood: action
    })
  }
  goods: IGood[] | null = null
  selectedGood: IGood | null = null
  setGoods = (goods: IGood[] | null) => this.goods = goods
  selectGood = (good: IGood | null) => this.selectedGood = good
  fetchGoods = async () => {
    try {
      const response = await axiosInstance.get<IGood[]>("goods/");
      this.setGoods(response.data);
    } catch (e) {
      console.log("Не удалось загрузить товары");
    }
  }
}

export const goodsStore = new Store()

autorun(async () => await goodsStore.fetchGoods())