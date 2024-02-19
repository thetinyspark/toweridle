import { Facade, ICommand, StoreModel } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";

/**
 * Remove all attackers that passes the door (aka winners)
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class RemoveWinnersCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any;       
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);
        if( bf === null )
            return false;

        if( bf.door.hp > 0 || bf.defenders.includes(bf.door) )
            return true;

        bf.attackers.forEach( 
            (fighter)=>{
                if( fighter.row === bf.targetRow && fighter.col === bf.targetCol ){
                    bf.attackers.splice(bf.attackers.indexOf(fighter), 1);
                    bf.winners.push(fighter);
                }
            }
        );

        return true;
    }
}