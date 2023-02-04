export type TarrifProType = {
    operator: string;
    min?: number;
    max?: number;
    value?: number;
}

export type TarrifType = {
    weight: TarrifProType;
    distance: TarrifProType;
    price: number;
}