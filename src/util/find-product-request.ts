import { AxiosRequestConfig } from "axios";
import { API_SERVICE_PATH } from "../config/constants";

type productIdType = number[];

export default function(productId: productIdType): AxiosRequestConfig[] {
    const config: AxiosRequestConfig = {
        url: API_SERVICE_PATH.GET_PRODUCT_URL,
        method: 'get'
    }
    return [config];
}