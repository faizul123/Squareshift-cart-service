import { AxiosResponse } from "axios";
import { PinCodeNotFound } from "./app-exceptions";

type ApiErrorResponse = {status: number, message: string};

export default function(response: AxiosResponse): number {
    const { data: {status, message}}: { data: ApiErrorResponse } = response;
    const isProductNotFound = message && message.includes("Invalid postal code") && status >= 400;
    if(isProductNotFound){
        throw new PinCodeNotFound("Invalid postal code");
    }
    return response.data.distance_in_kilometers;
}