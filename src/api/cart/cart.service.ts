import { Product } from "../../types/product.types";
import findProductRequest from "../../util/find-product-request";
import makeHttpCall from "../../util/make-http";
import { addItem } from "./cart.dto";

const addItem = async (list: addItem): Promise<Product | null> => {
   const requestList = findProductRequest(list.productIdList);
   const promises = requestList.map(request => makeHttpCall(request, "resolveProductResponse"));
   const products = await Promise.all(promises);
   return null;
}