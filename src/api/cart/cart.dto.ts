import Joi from "joi";

export type addItemDto = {
    productIdList: number[],
}

export const addItemDto = Joi.object({
    productIdList: Joi.array().items(Joi.number()).required(),
})