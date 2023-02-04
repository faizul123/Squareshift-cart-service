import mongoose from "mongoose";
import { ICartModel, ICartDoc } from "../../types/cart.types";

const cartSchema = new mongoose.Schema<ICartDoc, ICartModel>({
   userId: mongoose.Types.ObjectId,
   productId: Number,
})

const Cart = mongoose.model<ICartDoc, ICartModel>('user_cart', cartSchema);

export default Cart;
