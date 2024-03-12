"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
const Fighter_1 = require("../model/schema/Fighter");
const PathStrategyMode_1 = require("../model/enum/PathStrategyMode");
/**
 * Load battlefied configuration and creates a battlefield
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class CreateBattleFieldCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const factory = facade.getService(app_const_1.default.BATTLEFIELD_FACTORY);
        const path = facade.getService(app_const_1.default.PATH_SERVICE);
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = factory.fromData(data);
        // check if there is a path between each atk spawner and targetCol + targetRow
        const validPaths = bf.atkSpawners.map((spawner) => {
            const from = new Fighter_1.default(1, 1, "", 1, 1, 1, 1, 1, 1, 1, 1, spawner.row, spawner.col);
            const mypath = path.findPath(from, bf, PathStrategyMode_1.default.TO_THE_DOOR);
            if (mypath.length == 0)
                return false;
            return true;
        });
        if (validPaths.includes(false))
            return false;
        bfRepo.add(bf);
        return bf;
    }
}
exports.default = CreateBattleFieldCommand;
