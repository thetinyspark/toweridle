"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
const Utils_1 = require("../utils/Utils");
/**
 * each fighter tries to find the closest ennemy inside its radius
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class SearchForEnnemiesCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        bf.attackers.forEach((fighter) => {
            const inside = Utils_1.default.getEnnemiesInRadius(bf.defenders, fighter.row, fighter.col, fighter.radius);
            fighter.enemy = Utils_1.default.getClosestEnemyIn(inside, fighter.row, fighter.col);
        });
        bf.defenders.forEach((fighter) => {
            const inside = Utils_1.default.getEnnemiesInRadius(bf.attackers, fighter.row, fighter.col, fighter.radius);
            fighter.enemy = Utils_1.default.getClosestEnemyIn(inside, fighter.row, fighter.col);
        });
        return true;
    }
}
exports.default = SearchForEnnemiesCommand;
