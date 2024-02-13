"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
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
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = factory.fromData(data);
        bfRepo.add(bf);
        return bf;
    }
}
exports.default = CreateBattleFieldCommand;
