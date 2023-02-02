import { Product } from "./product.types";

export type Cart = {
    items: Product[];
    total: number;
}

export interface CartService {
    addItem(item: Product);
    delete(id: string);
    getItems(id: string): Product[];
}