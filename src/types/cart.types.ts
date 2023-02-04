import mongoose, { Model, Document } from 'mongoose';

export interface ICart {
    userId: mongoose.Types.ObjectId;
    productId: number;
}

export interface ICartDoc extends ICart, Document {

}

export interface ICartModel extends Model<ICartDoc> {

}
