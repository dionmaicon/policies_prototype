import { IPolicy } from "./interfaces/IPolicy";
import ISpecification from "./interfaces/ISpecification";

/**
 * Represents a base policy that can be extended to create more specific policies.
 * @implements IPolicy
 */
export class BasePolicy implements IPolicy {
    
    /**
     * An array of specifications that the policy must satisfy.
     */
    private specifications: ISpecification[] = [];

    /**
     * A boolean flag indicating whether the policy has been run or not.
     */
    private executed: boolean = false;

    /**
     * A map that stores the results of synchronous specification executions.
     */
    private executionSyncMapper: Map<string, Promise<boolean>> = new Map<string, Promise<boolean>>();

    /**
     * A map that stores the results of asynchronous specification executions.
     */
    private executionAsyncMapper: Map<string, boolean> = new Map<string, boolean>();

    /**
     * Adds a specification to the policy.
     * @param specification - The specification to add.
     */
    async addSpecification(specification: ISpecification) {
        this.specifications.push(specification);
    }

    /**
     * Checks if the policy has any errors.
     * @returns A boolean indicating whether the policy has any errors.
     */
    hasError() {
        this.checkIfAllSpecificationsWereExecuted();

        return this.specifications.some(specification => specification.hasError());
    }

    /**
     * Gets all the errors in the policy.
     * @returns An array of errors in the policy.
     */
    getErrors() {
        this.checkIfAllSpecificationsWereExecuted();

        return this.specifications.map(specification => specification.hasError()).filter(error => error !== null);
    }

    /**
     * Runs all the specifications synchronously.
     * @returns A map of specification names and their results.
     */
    runAllSync() {
        this.executed = true;
        
        this.specifications.forEach(specification => {
            this.executionSyncMapper.set(specification.name, specification.isSatisfied());
        });

        return this.executionSyncMapper;
    }
    
    /**
     * Runs all the specifications asynchronously.
     * @returns A map of specification names and their results.
     */
    async runAllAsync() {
        this.executed = true;
        
        for (const specification of this.specifications) {
            const result = await specification.isSatisfied();
            this.executionAsyncMapper.set(specification.name, result);
        }
        
        return this.executionAsyncMapper;
    }
    
    /**
     * Checks if all the specifications are satisfied.
     * @returns A boolean indicating whether all the specifications are satisfied.
     */
    checkIfAllSpecificationsAreSatisfied() {
        this.checkIfAllSpecificationsWereExecuted();

        return this.specifications.every(specification => specification.satisfied);
    }

    /**
     * Checks if all the specifications have been run.
     * @throws An error if the policy has not been run.
     */
    private checkIfAllSpecificationsWereExecuted() { 
        if (!this.executed) { 
            throw new Error("You must run the policy before checking for errors");
        }
    }

}