export interface UserProps  {
    id: string,
    name: string,
    age: number,
}

export class User {
    constructor(private props: UserProps) {}
    
    get id() {
        return this.props.id
    }
    get name() {
        return this.props.name
    }
    get age() {
        return this.props.age
    }
}