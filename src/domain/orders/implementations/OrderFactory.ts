
import { randomUUID } from "crypto";
import { ProductToSellProps } from "../../products/Product";
import { User } from "../../users/User";
import { Order } from "../Order";
import { CreateOrderByUserPolicy } from "../policies/CreateOrderByUserPolicy";
import DrinksSpecification from "../policies/specifications/DrinksSpecification";
import QuantitySpecification from "../policies/specifications/QuantitySpecification";
import { CreateOrderDiscountPolicy } from "../policies/CreateOrderDiscountPolicy";
import ProductToExpireSpecification from "../policies/specifications/ProductToExpireSpecification";
import { PolicyCallbackHandler } from "../../../infrastructure/policies/PolicyCallbackHandler";


export class OrderFactory {
    
    /**
     * Creates an order for a user with the given products.
     * @param user - The user who is creating the order.
     * @param products - The products to be included in the order.
     * @returns A new Order instance.
     */
    static async createOrder(user: User, products: ProductToSellProps[]) {
        const createOrderByUserPolicy = new CreateOrderByUserPolicy();
        createOrderByUserPolicy.addSpecification(new DrinksSpecification(user, products));
        createOrderByUserPolicy.addSpecification(new QuantitySpecification(products));

        const callbackhandler = new PolicyCallbackHandler(
            createOrderByUserPolicy, [ 
                { 
                    specification: DrinksSpecification.name, 
                    condition: true, 
                    callback: console.log, 
                    args: ["An alcoholic drink is going to be sell"] 
                },
                { 
                    specification: QuantitySpecification.name, 
                    condition: false, 
                    callback: console.log, 
                    args: ["we are not going to sell more than 10 items"] 
                }
            ]);

        await callbackhandler.runAllASyncWithCallbacks();

        if (createOrderByUserPolicy.hasError()) {
            throw createOrderByUserPolicy.getErrors()[0];
        }

        products.forEach(product =>  {
            const createOrderDiscountPolicy = new CreateOrderDiscountPolicy();
            createOrderDiscountPolicy.addSpecification(new ProductToExpireSpecification(product, ["Milk", "Eggs", "Bread"]));
            
            createOrderDiscountPolicy.runAllSync();

            if (createOrderDiscountPolicy.checkIfAllSpecificationsAreSatisfied()) {
                product.price = product.price * 0.9;
            }
        });
        
        const total = products.reduce((total, product) => total + (product.price * product.quantity), 0);

        const orderProps = {
            id: randomUUID(),
            total,
            products: products.map(product => ({id: product.id, quantity: product.quantity})),
            date: new Date(),
            userId: {id: user.id }
        }

        return new Order(orderProps);
    }
}












