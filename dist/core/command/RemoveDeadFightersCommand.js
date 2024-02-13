"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * removes dead fighters from battlefield
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class RemoveDeadFightersCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        bf.attackers.forEach((fighter) => {
            if (fighter.hp <= 0)
                bf.attackers.splice(bf.attackers.indexOf(fighter), 1);
        });
        bf.defenders.forEach((fighter) => {
            if (fighter.hp <= 0)
                bf.defenders.splice(bf.defenders.indexOf(fighter), 1);
        });
        return true;
    }
}
exports.default = RemoveDeadFightersCommand;
