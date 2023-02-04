import mongoose, { LeanDocument, Query } from "mongoose";
import { ICheckout, ICheckoutService } from "../../types/checkout.types";
import { ICart, ICartDoc } from "../../types/cart.types";
import { Product } from "../../types/product.types";
import findProductRequest from "../../util/find-product-request";
import makeHttpCall from "../../util/make-http-call";
import { addItemDto } from "./cart.dto";
import cartModel from "./cart.model";
import Checkout from "./checkout.service";
import { ValidationException } from "../../util/app-exceptions";

type addItemParam = {list: addItemDto, userId: string};

export const addProduct = async (value: addItemParam): Promise<any> => {
   const requestList = findProductRequest(value.list.productIdList);
   const promises = requestList.map(request => makeHttpCall(request, "resolveProductResponse"));
   const validProducts: Product[] = await Promise.all(promises) as Product[];
   const cartItems: ICart[] = validProducts.map(product =>  {
      return {
      userId: new mongoose.Types.ObjectId(value.userId),
      productId: product.id
      }
   });

   return _createUserCart(cartItems);
}

const _createUserCart = (userCart: ICart[]): Promise<ICartDoc[]> => {
   return cartModel.insertMany(userCart);
}

export const getProductsByUserId = async (userId: string): Promise<Product[]> => {
   const cartItems: ICartDoc[] = await cartModel.find({userId: new mongoose.Types.ObjectId(userId)}).lean();
   const productIds: number[] = cartItems.map(cartItem => cartItem.productId);
   const requestList = findProductRequest(productIds);
   const promises = requestList.map(request => makeHttpCall(request, "resolveProductResponse"));
   return Promise.all(promises) as Promise<Product[]>;
}

export const getCheckout = async (userId: string, pincode: string): Promise<ICheckout> => {
   const checkoutService: ICheckoutService = new Checkout(userId, pincode);
    return checkoutService.createCheckout();
}

export const removeItem = async (userId: string, productId: number) => {
   const filter = {userId: new mongoose.Types.ObjectId(userId), productId};
   const isExist: boolean = await cartModel.exists(filter).lean();
   if(!isExist) throw new ValidationException("Item doesn't exist in cart");
   return cartModel.remove(filter).lean();
}