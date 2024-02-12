import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import Utils from "../utils/Utils";

/**
 * each fighter tries to find the closest ennemy inside its radius
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class SearchForEnnemiesCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);

        bf.attackers.forEach( 
            (fighter)=>{
                const inside = Utils.getEnnemiesInRadius(bf.defenders, fighter.row, fighter.col, fighter.radius);
                fighter.enemy = Utils.getClosestEnemyIn(inside,  fighter.row, fighter.col);
            }
        );

        bf.defenders.forEach( 
            (fighter)=>{
                const inside = Utils.getEnnemiesInRadius(bf.attackers, fighter.row, fighter.col, fighter.radius);
                fighter.enemy = Utils.getClosestEnemyIn(inside,  fighter.row, fighter.col);
            }
        );

        return true;
    }
}