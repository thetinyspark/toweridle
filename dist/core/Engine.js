"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_observer_1 = require("@thetinyspark/tiny-observer");
const app_const_1 = require("./ioc/app.const");
const config_1 = require("./ioc/config");
const version_1 = require("../version");
/**
 * The Engine object represents the main gateway between you and the paradox engine's core.
 */
class Engine extends tiny_observer_1.Emitter {
    _facade;
    _container;
    constructor() {
        super();
    }
    /**
     * Reset data but keeps configuration
     */
    reset() {
        const uidService = this._container.resolve(app_const_1.default.UID_SERVICE);
        const fighters = this._container.resolve(app_const_1.default.FIGHTERS_REPOSITORY);
        uidService.reset();
        fighters.reset();
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
     * Processes a cycle. A cycle means that productions are added
     * to cities's wallets and consumptions are removed from them too.
     *
     * example.ts
     * ```typescript
     * Paradox.engine.doCycle()
     * ```
     */
    doCycle() {
        this.getFacade().sendNotification(app_const_1.default.DO_CYCLE);
    }
}
exports.default = Engine;
