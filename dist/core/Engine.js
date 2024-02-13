"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_observer_1 = require("@thetinyspark/tiny-observer");
const app_const_1 = require("./ioc/app.const");
const config_1 = require("./ioc/config");
const version_1 = require("../version");
/**
 * The Engine object represents the main gateway between you and the TowerIdle engine's core.
 */
class Engine extends tiny_observer_1.Emitter {
    constructor() {
        super();
    }
    /**
     * Reset data but keeps configuration
     */
    reset() {
        const uidService = this._container.resolve(app_const_1.default.UID_SERVICE);
        const battlefields = this._container.resolve(app_const_1.default.BATTLEFIELD_REPOSITORY);
        uidService.reset();
        battlefields.reset();
    }
    /**
     * Init the engine, and restores game data
     * @param container a Container's instance
     * @param configuration game data to restore
     */
    init(container) {
        container.reset();
        config_1.configIOC(container);
        config_1.configFacade(container);
        this._facade = container.resolve(app_const_1.default.APP_FACADE);
        this._container = container;
        // reset
        this.reset();
    }
    /**
     * Returns a version num
     * @returns string
     */
    getVersion() {
        return version_1.version;
    }
    /**
     * Returns the Facade which is used to dispatch commands and queries.
     * @returns Facade
     */
    getFacade() {
        return this._facade;
    }
    /**
     * Creates a battlefield with proper configuration
     * @param data BattleFieldDescType
     * @returns Promise<boolean>
     */
    createBattleField(data) {
        return this.getFacade().query(app_const_1.default.CREATE_BATTLEFIELD, data);
    }
    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFields() {
        const repo = this.getFacade().getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        return repo.getAll();
    }
    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFieldByID(id) {
        const repo = this.getFacade().getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        return repo.getOneBy('id', id);
    }
    /**
     * Processes a cycle.
     *
     *
     * example.ts
     * ```typescript
     * TowerIdle.engine.doCycle(1,1)
     * ```
     */
    doCycle(battlefieldID, numCycle, untilGameOver = false) {
        return this.getFacade().query(app_const_1.default.DO_CYCLE, { id: battlefieldID, numCycle, complete: untilGameOver });
    }
}
exports.default = Engine;
