import { ICheckout, ICheckoutService } from "../../types/checkout.types";
import ShippingCostFinder from "./distance-calc.service";
import findDistance from "../../util/find-warehouse-distance";
import { getProductsByUserId } from "./cart.service";
import { Product } from "../../types/product.types";
import makeHttpCall from "../../util/make-http-call";

type BillingDetailsType = {
    discount: number;
    weight: number;
    shipingCost: number;
    totalCost: number;
}

export default class Checkout implements ICheckoutService {

    private shipingCostFinder: ShippingCostFinder;
    private userId: string;
    private pincode: string;
    private distance: number;
    private products: Product[];

    constructor(userId: string, pincode: string){
        this.userId = userId;
        this.pincode = pincode;
        this.shipingCostFinder = ShippingCostFinder.getInstance();
    }

    private getTotalAmtToPay = (discount: number, shipingCost: number, totalCost: number): number => ((totalCost + shipingCost) - discount);
    
    async createCheckout(): Promise<ICheckout> {
        this.products = await getProductsByUserId(this.userId);

        const {discount, shipingCost, totalCost}: BillingDetailsType = await this.findBillingDetails();
        
        const checkout = {
            products: this.products,
            total: this.getTotalAmtToPay(discount, shipingCost, totalCost),
            discountAmount: discount,
            shippingCost: shipingCost,
        } as ICheckout;

        return checkout;
    }


    private async findBillingDetails() {
        const {weight, discount, totalCost}: Omit<BillingDetailsType, "shipingCost"> = this.products.reduce((billingDetails: BillingDetailsType, product: Product) => {
           const {discount: _discount, weight: totalWeight, totalCost} = billingDetails;
           return {
            discount: _discount + ( product.price - (product.price * product.discount_percentage/100)),
            weight: totalWeight + product.weight_in_grams,
            totalCost: totalCost + product.price,
           }
        }, {
            discount: 0,
            weight: 0,
            totalCost: 0,
        } as Omit<BillingDetailsType, "shipingCost"> );
        this.distance = await this.findDeliveryDistance();
        const weightInKG = weight / 1000;
        return {
            totalCost,
            weight,
            discount,
            shipingCost: this.shipingCostFinder.findShippingCost({weight: weightInKG, distance: this.distance})
        } as BillingDetailsType;
    }

    private async findDeliveryDistance(): Promise<number> {
        const requestConfig = findDistance(this.pincode);
        const distance = await makeHttpCall(requestConfig, "resolveDistanceAPIResponse") as number;
        return distance;
    }

}