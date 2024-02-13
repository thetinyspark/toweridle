"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Remove all attackers that passes the door (aka winners)
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class RemoveWinnersCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const winRepo = facade.getProxy(app_const_1.default.WINNERS_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        if (bf.door.hp > 0 || bf.defenders.includes(bf.door))
            return true;
        bf.attackers.forEach((fighter) => {
            if (fighter.row === bf.targetRow && fighter.col === bf.targetCol) {
                bf.attackers.splice(bf.attackers.indexOf(fighter), 1);
                winRepo.add(fighter);
            }
        });
        return true;
    }
}
exports.default = RemoveWinnersCommand;
