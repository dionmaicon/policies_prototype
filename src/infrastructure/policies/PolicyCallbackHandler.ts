/**
 * @file This file exports a class `PolicyCallbackHandler` which is responsible for handling policy callbacks.
 * @version 1.0.0
 */

import { BasePolicy } from "./BasePolicy";

/**
 * An object representing a policy callback.
 */
export type PolicyCallback = {
    specification: string;
    condition: boolean;
    callback: Function;
    args: any[];
}

/**
 * A class representing a policy callback handler.
 */
export class PolicyCallbackHandler  {
    /**
     * Creates an instance of `PolicyCallbackHandler`.
     * @param policy - An instance of `BasePolicy`.
     * @param policyCallbacks - An array of `PolicyCallback` objects.
     */
    constructor(private policy: BasePolicy, private policyCallbacks: PolicyCallback[]) {}
    
    /**
     * Runs all policies asynchronously with callbacks.
     */
    async runAllASyncWithCallbacks() {
        const results = await this.policy.runAllAsync();
        for (const [specification, result] of results.entries()) {
            if (this.policyCallbacks.some(specificationCallback => specificationCallback.specification === specification && specificationCallback.condition === result)) {
                const specificationCallback = this.policyCallbacks.find(specificationCallback => specificationCallback.specification === specification && specificationCallback.condition === result);
                specificationCallback?.callback(...specificationCallback.args);
            }
        }
    }

    /**
     * Runs all policies synchronously with callbacks.
     */
    runAllSyncWithCallbacks() {
        const results = this.policy.runAllSync();
        for (const [specification, result] of results.entries()) {
            result.then((result) => {
                if (this.policyCallbacks.some(specificationCallback => specificationCallback.specification === specification && specificationCallback.condition === result)) {
                    const specificationCallback = this.policyCallbacks.find(specificationCallback => specificationCallback.specification === specification && specificationCallback.condition === result);
                    specificationCallback?.callback(...specificationCallback.args);
                }
            });
        }
    }

}