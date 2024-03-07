export interface IGoods {
    brand: null | string;
    id: string;
    price: number;
    product: string;
}

export interface IFilterParams {
    [key: string]: string | number;
}
