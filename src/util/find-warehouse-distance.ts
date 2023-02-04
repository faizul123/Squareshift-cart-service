import { AxiosRequestConfig } from "axios";
import { API_SERVICE_PATH } from "../config/constants";

export default function(pincode: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
        url: API_SERVICE_PATH.GET_DISTANCE_URL,
        method: 'get',
        params: {
            postal_code: pincode
        }
    } as AxiosRequestConfig;
    return config;
}