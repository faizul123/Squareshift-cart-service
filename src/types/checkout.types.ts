import { Cart } from "./cart.types";

export type Checkout = {
    cart: Cart;
    total: number;
    discountAmount: number;
    shippingCost: number;
}

export interface CheckoutService {
    getCheckoutById(id: string): Checkout;
}