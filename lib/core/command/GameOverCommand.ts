import { Facade, ICommand, StoreModel } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";
import { GameOverInfoType } from "../model/types/GameOverInfoType";

/**
 * Returns info about game over
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class GameOverCommand implements ICommand{
    execute(notification: INotification): GameOverInfoType {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any;       
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const winRepo = facade.getProxy(AppConst.WINNERS_REPOSITORY) as IRepository<Fighter>;
        const defRepo = facade.getProxy(AppConst.DEAD_DEFENDERS_REPOSITORY) as IRepository<Fighter>;
        const atkRepo = facade.getProxy(AppConst.DEAD_ATTACKERS_REPOSITORY) as IRepository<Fighter>;
        const bf = bfRepo.getOneBy('id', data.id);
        const info:GameOverInfoType = {
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

        if( bf === null )
            return info;

        info.attackers = bf.attackers;
        info.defenders = bf.defenders;
        info.winners = winRepo.getAll();

        const numAttackersToSpawn = bf.atkSpawners.reduceRight( 
            (prev, cur, index)=>{
                return prev + cur.fighters.length
            }, 
            0
        );

        const numAtkLeft = bf.attackers.length + numAttackersToSpawn;
        const numWinners = info.winners.length;
        const isDoorAlive = bf.defenders.includes(bf.door) && bf.door.hp > 0;
        const isDoorDead = !isDoorAlive;

        info.isDoorDead = isDoorDead; 

        if( numAtkLeft == 0 ){
            info.gameover = true; 
            info.defenderWins = numWinners == 0;
            info.attackerWins = numWinners > 0;
            return info;
        }

        return info;
    }
}