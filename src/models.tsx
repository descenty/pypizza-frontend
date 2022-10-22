export interface IConfiguration {
    size: string
    price: number
}

export interface IGood {
    id: number
    name: string
    configurations: [IConfiguration]
    image: string
    description: string
    category: string
}

export interface IToken {
    token: string
}

export interface IUser {
    phone: string
    fio: string
    token: string
}