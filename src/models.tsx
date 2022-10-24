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

export interface IUser {
  phone: string;
  fio: string;
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

type SizeName = { [day in SizeType]: string };

const sizes: { [category: string]: SizeName } = {
  PIZZA: {
    SMALL: "Маленькая",
    MEDIUM: "Средняя",
    BIG: "Большая",
  },
  DEFAULT: {
    SMALL: "Маленький",
    MEDIUM: "Средний",
    BIG: "Большой",
  },
};

export const getSizeName = (
  category: string,
  value: SizeType
): string | undefined => {
  if (category in sizes) {
    return sizes[category][value];
  } else return sizes["DEFAULT"][value];
};
