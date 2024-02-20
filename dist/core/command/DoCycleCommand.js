"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * process an entire cycle
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class DoCycleCommand {
    async execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        const complete = data.complete === true;
        const slow = data.optimize == false;
        let info = null;
        if (bf === null)
            return false;
        info = await this._processCycle(facade, bf, data.numCycle, !slow);
        if (!complete || info.gameover)
            return info;
        let count = 0;
        while (info.gameover == false && count < 10000) {
            count++;
            data.numCycle++;
            info = await this._processCycle(facade, bf, data.numCycle, !slow);
        }
        return info;
    }
    async _processCycle(facade, bf, numCycle, optimize = false) {
        await facade.query(app_const_1.default.SPAWN_NEW_FIGHTERS, { id: bf.id, numCycle: numCycle });
        await facade.query(app_const_1.default.SEARCH_FOR_ENNEMIES, { id: bf.id });
        await facade.query(app_const_1.default.SET_FIGHTERS_PATH, { id: bf.id, optimize });
        await facade.query(app_const_1.default.MOVE_FIGHTERS, { id: bf.id });
        await facade.query(app_const_1.default.FIGHT, { id: bf.id });
        await facade.query(app_const_1.default.REMOVE_DEAD_FIGHTERS, { id: bf.id });
        await facade.query(app_const_1.default.REMOVE_WINNERS, { id: bf.id });
        return await facade.query(app_const_1.default.GAME_OVER, { id: bf.id });
    }
}
exports.default = DoCycleCommand;
