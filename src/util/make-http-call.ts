import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import resolveProductResponse from './find-product-response';
import resolveDistanceAPIResponse from './find-distance-response';
import { Product } from "../types/product.types";

const config: CreateAxiosDefaults = {
    baseURL: "http://15.206.157.204:8080",
    timeout: 10000, // 10s timeout
};

const instance = axios.create(config);

const responseResolvers = {
    "resolveProductResponse": resolveProductResponse,
    "resolveDistanceAPIResponse": resolveDistanceAPIResponse
}

type resolvers = keyof typeof responseResolvers;

type ServiceResponse = Promise<Product | number>;

export default function makeHttpCall(request: AxiosRequestConfig, resolvers: resolvers): ServiceResponse {
    const handleResponse = responseResolvers[resolvers];
    return instance.request(request).then(response => handleResponse(response));
}
