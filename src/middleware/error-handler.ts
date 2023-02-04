import { Request, Response, NextFunction } from "express"
import { PinCodeNotFound } from "../util/app-exceptions"
import { ProductNotFound } from "../util/app-exceptions"



export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if(error instanceof ProductNotFound || error instanceof PinCodeNotFound) {
        return res.status(400).send({
            success: false,
            data: {},
            error: error.message,
        });
    }else {
        return res.status(400).send({
            success: false,
            error: error.message
        });
    }
}