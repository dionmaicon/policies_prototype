# Writing Policies and Specifications based on Eric Evans' DDD

## Introduction

Writing policies and specifications is an important part of software development, especially when following the Domain-Driven Design (DDD) approach by Eric Evans. Policies and specifications help define the expected behavior of the system in different scenarios and ensure that the software meets business requirements. We will explore how to write policies and specifications using DDD.

## What are Policies and Specifications?

Policies and specifications are rules that define the expected behavior of the system in different scenarios. Policies are generally more abstract and define the overall behavior of the system, while specifications are more detailed and define behavior in specific scenarios.

## Writing Policies

Policies are written in natural language and describe the general behavior of the system. They should be clear and concise, and should be written in business terms rather than technical terms. Here is an example of a policy for an Order System:

| Policy | Description |
| --- | --- |
| The system should impose limits on users when creating Orders, based on our sales policies | The system should ensure that users, based on collected data, have individualized actions when assembling their Order. Factors such as age and quantity of items per order are some of these restrictions |

## Writing Specifications

Specifications are written in natural language and describe the expected behavior of the system in specific scenarios. They should be clear and concise, and should be written in business terms rather than technical terms. Here is an example of a specification for the above policy:

| Specification (Validation) | Description |
| --- | --- |
| The system should block the sale of alcoholic beverages to minors | When a user tries to create an Order and is underage (18 years old), the system should return an error message and block the creation of the Order. Message: "User is not allowed to buy alcoholic drinks" |

Now, another specification, this time related to a discount policy.

| Specification (Construction) | Description |
| --- | --- |
| The system should give a discount for Products with a close expiration date | When a user buys Products with a close expiration date (a list of Products is available), the user should receive a 10% discount |


## Coding Specifications

Drink Specification Class
```
// DrinksSpecification.ts
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
```

Product to Expire Specification Class

```
// ProductToExpireSpecification.ts
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
```