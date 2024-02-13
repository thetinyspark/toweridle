"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Move all fighters
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class MoveFightersCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        bf.attackers.forEach((fighter) => {
            if (fighter.path.length === 0 || fighter.enemy !== null)
                return;
            const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);
            fighter.row = fighter.path[nextIndx].state.row;
            fighter.col = fighter.path[nextIndx].state.col;
            fighter.path.splice(0, nextIndx);
        });
        bf.defenders.forEach((fighter) => {
            if (fighter.path.length === 0 || fighter.enemy !== null)
                return;
            const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);
            fighter.row = fighter.path[nextIndx].state.row;
            fighter.col = fighter.path[nextIndx].state.col;
            fighter.path.splice(0, nextIndx);
        });
        return true;
    }
}
exports.default = MoveFightersCommand;
