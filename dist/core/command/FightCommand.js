"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Proceed a fight attackers & defenders
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class FightCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        if (bf === null)
            return false;
        const everyone = bf.attackers.concat(bf.defenders);
        everyone.forEach((fighter) => {
            if (!fighter.enemy)
                return;
            const phy = Math.max(0, fighter.phyAtk - fighter.enemy.phyDef);
            const mag = Math.max(0, fighter.magAtk - fighter.enemy.magDef);
            const total = mag + phy;
            fighter.enemy.hp = Math.max(0, fighter.enemy.hp - total);
        });
        return true;
    }
}
exports.default = FightCommand;
