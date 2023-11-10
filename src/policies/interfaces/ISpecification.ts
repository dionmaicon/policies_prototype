import { BaseError } from "../../../BaseError";

export default interface ISpecification {
    satisfied: boolean;
    name: string;
    isSatisfied(): Promise<boolean>;
    hasError(): BaseError | null;
}