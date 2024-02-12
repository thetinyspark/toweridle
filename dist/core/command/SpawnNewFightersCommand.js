"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Creates new fighters according to spawners configuration
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class SpawnNewFightersCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        bf.atkSpawners.forEach((spawner) => {
            const condition1 = data.numCycle % spawner.frequency !== 0;
            const condition2 = spawner.fighters.length === 0;
            if (condition1 || condition2)
                return;
            bf.attackers.push(spawner.fighters.shift());
        });
        bf.dfdSpawners.forEach((spawner) => {
            const condition1 = data.numCycle % spawner.frequency !== 0;
            const condition2 = spawner.fighters.length === 0;
            if (condition1 || condition2)
                return;
            bf.defenders.push(spawner.fighters.shift());
        });
        return true;
    }
}
exports.default = SpawnNewFightersCommand;
