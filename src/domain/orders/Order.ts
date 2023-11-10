import { Product } from "../products/Product"
import { User } from "../users/User"

export interface OrderProps  {
    id: string,
    total: number,
    products: Pick<Product, "id" >[],
    date: Date,
    userId: Pick<User, "id" >,
}

export class Order {
    constructor(private props: OrderProps) {}
    
    get id() {
        return this.props.id
    }
    get total() {
        return this.props.total
    }
    get date() {
        return this.props.date
    }
    get userId() {
        return this.props.userId
    }
}