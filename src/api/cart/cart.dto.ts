import Joi from "joi";

export type addItem = {
    productIdList: number[],
}

export const addItemDto = Joi.object({
    productIdList: Joi.array().items(Joi.number()).required(),
})