"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Returns info about game over
 *
 * example.ts
 * ```typescript
 *
 *
 * ```
 */
class GameOverCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const bfRepo = facade.getProxy(app_const_1.default.BATTLEFIELD_REPOSITORY);
        const winRepo = facade.getProxy(app_const_1.default.WINNERS_REPOSITORY);
        const defRepo = facade.getProxy(app_const_1.default.DEAD_DEFENDERS_REPOSITORY);
        const atkRepo = facade.getProxy(app_const_1.default.DEAD_ATTACKERS_REPOSITORY);
        const bf = bfRepo.getOneBy('id', data.id);
        const info = {
            attackers: [],
            defenders: [],
            winners: [],
            attackerWins: false,
            defenderWins: false,
            gameover: false,
            isDoorDead: false,
            deadAttackers: [],
            deadDefenders: []
        };
        info.deadAttackers = atkRepo.getAll();
        info.deadDefenders = defRepo.getAll();
        if (bf === null)
            return info;
        info.attackers = bf.attackers;
        info.defenders = bf.defenders;
        info.winners = winRepo.getAll();
        const numAttackersToSpawn = bf.atkSpawners.reduceRight((prev, cur, index) => {
            return prev + cur.fighters.length;
        }, 0);
        const numAtkLeft = bf.attackers.length + numAttackersToSpawn;
        const numWinners = info.winners.length;
        const isDoorAlive = bf.defenders.includes(bf.door) && bf.door.hp > 0;
        const isDoorDead = !isDoorAlive;
        info.isDoorDead = isDoorDead;
        if (numAtkLeft == 0) {
            info.gameover = true;
            info.defenderWins = numWinners == 0;
            info.attackerWins = numWinners > 0;
            return info;
        }
        return info;
    }
}
exports.default = GameOverCommand;
