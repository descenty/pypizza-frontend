import { Dispatch, SetStateAction } from "react";
import { axiosInstance } from "./App";
import { ICart, IConfiguration, IGood } from "./models";

export const addToCart = async (
    good: IGood | undefined,
    configuration: IConfiguration | undefined,
) => {
    await axiosInstance
        .post(
            "add-to-cart/",
            {
                good_id: good?.id,
                size: configuration?.size,
            },
        )
        .catch(() => alert("Не удалось добавить товар в корзину"));
};

export const removeFromCart = async (
    good: IGood | undefined,
    configuration: IConfiguration | undefined,
) => {
    await axiosInstance
        .post(
            "remove-from-cart/",
            {
                good_id: good?.id,
                size: configuration?.size,
            },
        )
        .catch(() => alert("Не удалось удалить товар из корзины"));
};

export async function getCart(): Promise<ICart> {
    return (await axiosInstance.get<ICart>("cart/")).data
};