
import BaseError from "./BaseError";
import ISpecification from "./interfaces/ISpecification";

/**
 * Base class for implementing a specification pattern.
 * @implements {ISpecification}
 */
export abstract class BaseSpecification implements ISpecification {
    /**
     * The name of the specification.
     */
    name: string;
    /**
     * Indicates whether the specification is satisfied or not.
     */
    satisfied: boolean = false;

    private error: BaseError | null = null;


    /**
     * Creates an instance of BaseSpecification.
     * @param {string} [name] - The name of the specification.
     */
    constructor(name?: string) {
        this.name = name || this.constructor.name;
    }

    /**
     * Checks if the specification is satisfied.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the specification is satisfied or not.
     */
    abstract isSatisfied(): Promise<boolean>;
    
    /**
     * Sets an error value for the specification.
     * @param {BaseError} errorValue - The error value to set.
     */
    setError(errorValue: BaseError) {
        this.error = errorValue;
    }

    /**
     * Gets the error value of the specification.
     * @returns {BaseError | null} The error value of the specification, or null if there is no error.
     */
    hasError(): BaseError | null {
        return this.error;
    }

    /**
     * Sets the result of the specification.
     * @param {boolean} result - The result to set.
     * @returns {Promise<boolean>} A promise that resolves to the result that was set.
     */
    async sendResult(result: boolean): Promise<boolean> {
        this.satisfied = result;
        return Promise.resolve(result);
    }
}