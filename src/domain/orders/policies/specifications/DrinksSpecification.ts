

import BaseError from "../../../../infrastructure/policies/BaseError";
import { BaseSpecification } from "../../../../infrastructure/policies/BaseSpecification";
import { ProductCategories, ProductToSellProps } from "../../../products/Product";
import { User } from "../../../users/User";

export default class DrinksSpecification extends BaseSpecification {
    
    constructor(private user: User, private products: ProductToSellProps[]) {
        super();
    }
    
    async isSatisfied(): Promise<boolean> {
        if (this.user.age < 18 && this.products.some(product => product.category == ProductCategories.ALCOHOLIC_DRINK)) {
            this.setError(new BaseError("User is not allowed to buy alcoholic drinks"));
            return this.sendResult(false);
        }
        return this.sendResult(true);
    }
}