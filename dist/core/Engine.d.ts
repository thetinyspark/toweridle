import { Container, Facade } from "@thetinyspark/coffe-maker";
import { Emitter } from "@thetinyspark/tiny-observer";
/**
 * The Engine object represents the main gateway between you and the paradox engine's core.
 */
export default class Engine extends Emitter {
    private _facade;
    private _container;
    constructor();
    /**
     * Reset data but keeps configuration
     */
    reset(): void;
    /**
     * Init the engine, and restores game data
     * @param container a Container's instance
     * @param configuration game data to restore
     */
    init(container: Container): void;
    /**
     * Returns a version num
     * @returns string
     */
    getVersion(): string;
    /**
     * Returns the Facade which is used to dispatch commands and queries.
     * @returns Facade
     */
    getFacade(): Facade;
    /**
     * Processes a cycle. A cycle means that productions are added
     * to cities's wallets and consumptions are removed from them too.
     *
     * example.ts
     * ```typescript
     * Paradox.engine.doCycle()
     * ```
     */
    doCycle(): void;
}
