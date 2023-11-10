/**
 * Represents a specification that checks if a product is about to expire.
 */


import { BaseSpecification } from "../../../../policies/BaseSpecification";
import { ProductToSellProps } from "../../../products/Product";

export default class ProductToExpireSpecification extends BaseSpecification {
    
    constructor(private product: ProductToSellProps, private productsToExpire: string[]) {
        super();
    }
    
    async isSatisfied(): Promise<boolean> {
        if (this.productsToExpire.some( toExpire => toExpire === this.product.name)) {
            return this.sendResult(true);
        }
        return this.sendResult(false);
    }
}