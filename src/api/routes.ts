import { Router } from "express";
import { catchAsync } from "../util/catch-async";
import {addItemController, getItemsController, getCheckoutController, removeItemController} from "./cart/cart.controller";

const router = Router();

router.post("/cart/item", catchAsync( addItemController ));
router.get("/cart/items", catchAsync( getItemsController ));
router.get("/cart/checkout-value", catchAsync( getCheckoutController ));
router.delete("/cart/:productId", catchAsync( removeItemController ));

export default router;

