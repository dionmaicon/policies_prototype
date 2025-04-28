# Writing Policies and Specifications based on Eric Evans' DDD

## Implicit vs Explicit Rules

When the project becomes too big with dozens, hundreds or thousands of rules. We need a method to handle the business requirements that hold the major features without breaking changes and, of course, can bring value to the project.  Eric Evans has a method to do that, making the moving from implicit to explicit restrictions an opportunity for advancement.
Let's keep in mind Implicit restrictions as non-declarative rules that are coded in the domain layer (most of the time) by if, else, switch, etc and spread between aggregates, object-values, services and entities. These restrictions as non-declarative methods, tend to be hard to discover and hard to maintain.
On the other hand, we can make use of declarative rules, for that, in an Object-oriented language, We use Objects. Declarative rules have a great impact on the way we can program, as we can bring to the software the functional requirements using the domain language, most likely assertively.

## Specifications By Eric Evans

The Specification declares a restriction over another object state, which may or may not be satisfied. There are 3 different purposes:
 
1. To validate an Object - To verify if it can fit some needs or is ready for some purpose.
2. To select an Object - To verify if it can be selected by filtered rules.
3. To specify an Object Creation - To verify if it can fit some needs in an object creation process.

<img src="https://uploads.tcheblock.com/uploads/2025/03/Specification.png" alt="Specifications DDD Book" width="1064" height="529" class="size-full wp-image-108" /> Specifications DDD Book

## Policies vs Specifications

Now that we have an introduction to Specification, I can present my approach to the problem.

Both Policies and Specifications are rules that define the expected behavior of the system in different scenarios. Policies are generally more abstract and define the general behavior of the system, while specifications are more detailed and define behavior for specific scenarios.

<img src="https://uploads.tcheblock.com/uploads/2023/11/Policy.png" alt="Policies and Specifications" width="1058" height="523" class="size-full wp-image-107" /> Policies and Specifications

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


