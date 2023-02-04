import { Product } from "./product.types";

export type ICheckout = {
    /**
     * List of items added into Customer's cart
     */
    products: Product[];

    /**
     * 
     * Total amount to be paid by customer.
     * This amount derived by 
     * total = (totalItemsCost + ShipingCost) - discount;
     */
    total: number;

    /**
     * 
     * Sum of discount by each products in Cart
     */
    discountAmount: number;

    /**
     * Cost to delivery parcel to Customer.
     * This cost is calculated with weight and distance.
     */
    shippingCost: number;
}

export interface ICheckoutService {
    createCheckout(): Promise<ICheckout>;
}