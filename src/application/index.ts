import { randomUUID } from "crypto";
import { OrderFactory } from "../domain/orders/implementations/OrderFactory";
import { User } from "../domain/users/User";
import { Product, ProductCategories } from "../domain/products/Product";
import { Order } from "../domain/orders/Order";

const users  = [{
    id: randomUUID(),
    name: "John",
    age: 18
}, {
    id: randomUUID(),
    name: "Mary",
    age: 18
}];

const productsListOne = [{
    id: randomUUID(),
    name: "Beer",
    price: 5,
    category: ProductCategories.ALCOHOLIC_DRINK,
    quantity: 11
}, {
    id: randomUUID(),
    name: "Water",
    price: 5,
    category: ProductCategories.DRINK,
    quantity: 1
}];

const productsListTwo = [{
        id: randomUUID(),
        name: "Milk",
        price: 2,
        category: ProductCategories.DRINK,
        quantity: 1
}];

/**
 * Runs the main logic of the application, creating orders for the given users and products.
 */
const main = async () => {
    const john = new User(users[0]);
    const mary = new User(users[1]);

    const list = [
        {
            user: john,
            products: productsListOne.map(product => (new Product(product).toSell({ quantity: product.quantity })))
        },
        {
            user: mary, 
            products: productsListTwo.map(product => (new Product(product).toSell({ quantity: product.quantity })))
        }
    ]
    
    const createdOrders : { userName: string, order: Order }[] = [];

    for (const order of list) {
        try {
            const orderCreated = await OrderFactory.createOrder(order.user, order.products);
            createdOrders.push({userName: order.user.name, order: orderCreated });
        } catch (error: any) {
            console.log('Error: ', error.message);
        }
    }
    
    console.log('Orders created: \n', createdOrders);
}


main();