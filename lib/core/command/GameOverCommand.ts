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
        const bf = bfRepo.getOneBy('id', data.id);
        const info:GameOverInfoType = {
            attackers: [], 
            defenders: [], 
            winners: [],
            attackerWins: false, 
            defenderWins: false, 
            gameover: false, 
            isDoorDead: false
        };

        if( bf === null )
            return info;

        info.attackers = bf.attackers;
        info.defenders = bf.defenders;
        info.winners = winRepo.getAll();

        const numAtkLeft = bf.attackers.length;
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