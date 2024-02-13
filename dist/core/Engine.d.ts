import { Container, Facade } from "@thetinyspark/coffe-maker";
import { Emitter } from "@thetinyspark/tiny-observer";
import BattleField from "./model/schema/BattleField";
import { BattleFieldDescType } from "./model/types/BattleFieldDescType";
import { GameOverInfoType } from "./model/types/GameOverInfoType";
/**
 * The Engine object represents the main gateway between you and the TowerIdle engine's core.
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
     * Creates a battlefield with proper configuration
     * @param data BattleFieldDescType
     * @returns Promise<boolean>
     */
    createBattleField(data: BattleFieldDescType): Promise<BattleField>;
    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFields(): BattleField[];
    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFieldByID(id: number): BattleField;
    /**
     * Processes a cycle.
     *
     *
     * example.ts
     * ```typescript
     * TowerIdle.engine.doCycle(1,1)
     * ```
     */
    doCycle(battlefieldID: number, numCycle: number): Promise<GameOverInfoType>;
}
