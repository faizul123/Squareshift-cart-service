import config from '../config/init-config';
import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import resolveProductResponse from './find-product-response';
import resolveDistanceAPIResponse from './find-distance-response';
import { Product } from "../types/product.types";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: config.productServiceHost,
    timeout: 10000, // 10s timeout
};

const instance = axios.create(axiosConfig);

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
