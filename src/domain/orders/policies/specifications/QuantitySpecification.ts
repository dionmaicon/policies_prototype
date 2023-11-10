/**
 * Represents a specification that checks if the quantity of products to be sold is within the allowed limit.
 */


import BaseError from "../../../../infrastructure/policies/BaseError";
import { BaseSpecification } from "../../../../infrastructure/policies/BaseSpecification";
import { ProductToSellProps } from "../../../products/Product";

export default class QuantitySpecification extends BaseSpecification {
    private MAX_QUANTITY = 10;

    constructor(private products: ProductToSellProps[]) {
        super();
    }
    
    async isSatisfied(): Promise<boolean> {
        if (this.products.some(product => product.quantity > this.MAX_QUANTITY)) {
            this.setError(new BaseError(`User is not allowed to buy more than ${this.MAX_QUANTITY} items`));   
            return this.sendResult(false);
        }
        return this.sendResult(true);
    }
}