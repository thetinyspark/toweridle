"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
const PathStrategyMode_1 = require("../model/enum/PathStrategyMode");
/**
 * Set fighters paths
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class SetFightersPathCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const pathService = facade.getService(app_const_1.default.PATH_SERVICE);
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        bf.attackers.forEach((fighter) => {
            fighter.path = pathService.findPath(fighter, bf, PathStrategyMode_1.default.TO_THE_DOOR);
        });
        bf.defenders.forEach((fighter) => {
            if (fighter === bf.door)
                return;
            fighter.path = pathService.findPath(fighter, bf, PathStrategyMode_1.default.TO_THE_CLOSEST_ENEMY);
        });
        return true;
    }
}
exports.default = SetFightersPathCommand;
