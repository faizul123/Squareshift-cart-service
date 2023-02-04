import { AxiosRequestConfig } from "axios";
import { API_SERVICE_PATH } from "../config/constants";

type productIdType = number[];

export default function(productIdList: productIdType): AxiosRequestConfig[] {
    const config: AxiosRequestConfig[] = productIdList.map(productId => {
        return {
            url: API_SERVICE_PATH.GET_PRODUCT_URL.replace('{id}', `${productId}`),
            method: 'get'
        } as AxiosRequestConfig;
    })
    return config;
}