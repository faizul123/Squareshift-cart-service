import { AxiosResponse } from "axios";
import { Product } from "../types/product.types";
import { ProductNotFound } from "./app-exceptions";

type ApiErrorResponse = {status: number, message: string};

export default function(response: AxiosResponse): Product {
    const { data: {status, message}}: { data: ApiErrorResponse } = response;
    const isProductNotFound = message && message.includes("Invalid product id") && status >= 400;
    if(isProductNotFound){
        throw new ProductNotFound("Invalid Product id");
    }
    return response.data as Product;
}