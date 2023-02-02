import axios, { AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import resolveProductResponse from './find-product-response';

const config: CreateAxiosDefaults = {
    baseURL: "http://15.206.157.204:8080",
    timeout: 10000, // 10s timeout
};

const instance = axios.create(config);

const responseResolvers = {
    "resolveProductResponse": resolveProductResponse
}

type resolvers = keyof typeof responseResolvers;

export default function makeHttpCall(request: AxiosRequestConfig, resolvers: resolvers) {
    const handleResponse = responseResolvers[resolvers];
    instance.request(request).then(response => handleResponse(response));
}
