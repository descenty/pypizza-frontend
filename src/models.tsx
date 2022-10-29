export interface IConfiguration {
  size: string;
  price: number;
}

export interface IGood {
  id: number;
  name: string;
  configurations: [IConfiguration];
  image: string;
  description: string;
  category: string;
}

export interface IToken {
  token: string;
}

export interface ISavedAddress {
  name: string;
  latitude: number;
  longitude: number;
}

export interface IUser {
  phone: string;
  fio: string;
  bonus_points: number;
  saved_addresses: ISavedAddress[];
  token: string;
}

export interface ICartGood {
  good: IGood;
  configuration: IConfiguration;
  quantity: number;
  created_date: string;
  selected: boolean;
}

export interface ICart {
  cart_goods: ICartGood[];
  count: number;
  total: number;
  total_with_discount: number;
  promo_code: string | null;
  promo_code_name: string | null;
}

export type SizeType = "SMALL" | "MEDIUM" | "BIG";
export type Category = "PIZZA" | "DRINKS" | "BURGERS" | "DESERTS" | "DEFAULT";

type SizeName = { [size in SizeType]: string };

const sizes: { [category in Category]: SizeName } = {
  PIZZA: {
    SMALL: "Маленькая - 25 см",
    MEDIUM: "Средняя - 30 см",
    BIG: "Большая - 35 см",
  },
  BURGERS: {
    SMALL: "Маленький",
    MEDIUM: "Средний",
    BIG: "Большой",
  },
  DRINKS: {
    SMALL: "200 ml",
    MEDIUM: "300 ml",
    BIG: "500 ml",
  },
  DESERTS: {
    SMALL: "Маленький",
    MEDIUM: "Средний",
    BIG: "Большой",
  },
  DEFAULT: {
    SMALL: "Маленький",
    MEDIUM: "Средний",
    BIG: "Большой",
  },
};

export const getSizeName = (
  category: Category,
  value: SizeType
): string | undefined => {
  if (category in sizes) {
    return sizes[category][value];
  } else return sizes["DEFAULT"][value];
};
