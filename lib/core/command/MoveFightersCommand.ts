import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import path = require("path");

/**
 * Move all fighters
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class MoveFightersCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any;       
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);
        if( bf === null )
            return false;

        bf.attackers.forEach( 
            (fighter)=>{
                if( fighter.path.length === 0 )
                    return;

                const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);
                fighter.row = fighter.path[nextIndx].state.row;
                fighter.col = fighter.path[nextIndx].state.col;
                fighter.path.splice(0, nextIndx);
            }
        );

        bf.defenders.forEach( 
            (fighter)=>{
                if( fighter.path.length === 0 )
                    return;
                const nextIndx = Math.min(fighter.path.length - 1, fighter.speed);
                fighter.row = fighter.path[nextIndx].state.row;
                fighter.col = fighter.path[nextIndx].state.col;
                fighter.path.splice(0, nextIndx);
            }
        );

        return true;
    }
}