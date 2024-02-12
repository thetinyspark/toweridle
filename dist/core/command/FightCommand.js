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
        return true;
    }
}
exports.default = FightCommand;
