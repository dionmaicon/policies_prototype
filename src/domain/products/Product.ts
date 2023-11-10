export enum  ProductCategories {
    FOOD = "food",
    ALCOHOLIC_DRINK = "alcoholic drink",
    DRINK = "drink",
}

export interface ProductProps  {
    id: string,
    name: string,
    price: number,
    category: ProductCategories,
}

export interface ProductToSellProps extends ProductProps {
    quantity: number,
}    

export class Product {
    constructor(private props: ProductProps) {}
    
    get id() {
        return this.props.id
    }
    get name() {
        return this.props.name
    }
    get price() {
        return this.props.price
    }
    get category() {
        return this.props.category
    }

    toSell({ quantity }: { quantity: number }): ProductToSellProps {
        return {
            ...this.props,
            quantity,
        }
    }
}