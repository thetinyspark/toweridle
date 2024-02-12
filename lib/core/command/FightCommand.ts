import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import IFactory from "../service/factory/IFactory";
import BattleField from "../model/schema/BattleField";

/**
 * Proceed a fight attackers & defenders
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class FightCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);

        if( bf === null )
            return false;

        const everyone = bf.attackers.concat(bf.defenders);

        everyone.forEach( 
            (fighter)=>{
                if( !fighter.enemy )
                    return; 

                const phy = Math.max(0, fighter.phyAtk - fighter.enemy.phyDef);
                const mag = Math.max(0, fighter.magAtk - fighter.enemy.magDef);
                const total = mag + phy;
                fighter.enemy.hp = Math.max(0, fighter.enemy.hp - total);
            }
        );

        return true;
    }
}