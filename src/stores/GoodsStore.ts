import { action, autorun, makeObservable, observable, runInAction } from "mobx";
import { axiosInstance } from "../settings";
import { IGood } from "../models";


class Store {
  constructor() {
    makeObservable(this, {
      goods: observable,
      selectedGood: observable,
      // showGoodWindow changes before selectedGood changing for properly smooth animation without undefined
      showGoodWindow: observable,
      fetchGoods: action,
      setGoods: action,
      selectGood: action
    })
  }
  showGoodWindow: boolean = false;
  goods: IGood[] | null = null
  selectedGood: IGood | null = null
  setGoods = (goods: IGood[] | null) => this.goods = goods
  selectGood = (good: IGood | null) => {
    this.showGoodWindow = good ? true : false
    if (this.showGoodWindow)
      this.selectedGood = good
    else
      setTimeout(() => runInAction(() => this.selectedGood = good), 500)
  }
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