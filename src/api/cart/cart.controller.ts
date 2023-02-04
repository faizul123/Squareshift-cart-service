import { Request, Response } from "express";
import { addItemDto } from "./cart.dto";
import { addProduct, getCheckout, getProductsByUserId, removeItem } from "./cart.service";
import { AppResponse } from "../../types/response.types";
import { Product } from "../../types/product.types";
import { ICheckout } from "../../types/checkout.types";

export const addItemController = async (req: Request, res: Response) => {
    const userId: string = req.header('x-app-userid');
    const list: addItemDto = req.body;
    const products = await addProduct({userId, list});
    return res.status(200).send({
        success: true,
        data: products,
        error: null
    } as AppResponse );
}

export const getItemsController = async (req: Request, res: Response) => {
    const userId: string = req.header('x-app-userid');
    const products: Product[] = await getProductsByUserId(userId);
    return res.status(200).send({
        success: true,
        data: products,
        error: null
    } as AppResponse)
}

export const getCheckoutController = async (req: Request, res: Response) => {
    const userId: string = req.header('x-app-userid');
    const pincode = req.query.pincode as string;
    const checkout: ICheckout = await getCheckout(userId, pincode);
    return res.status(200).send({
        success: true,
        data: checkout,
        error: null,
    } as AppResponse)
}

export const removeItemController = async (req: Request, res: Response) => {
    const userId: string = req.header('x-app-userid');
    const { productId } = req.params;
    await removeItem(userId, Number(productId));
    res.status(200).send({
        success: true,
        data: {},
        error: null
    } as AppResponse)

}