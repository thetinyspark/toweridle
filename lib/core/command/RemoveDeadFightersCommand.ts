import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";

/**
 * removes dead fighters from battlefield
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class RemoveDeadFightersCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);
        
        if( bf === null )
            return false;

        bf.attackers.forEach( 
            (fighter)=>{
                if( fighter.hp <= 0 ){
                    bf.attackers.splice(bf.attackers.indexOf(fighter), 1);
                    bf.deadAttackers.push(fighter);
                }
            }
        );

        bf.defenders.forEach( 
            (fighter)=>{
                if( fighter.hp <= 0 ){
                    bf.defenders.splice(bf.defenders.indexOf(fighter), 1);
                    bf.deadDefenders.push(fighter);
                }
            }
        );

        return true;
    }
}