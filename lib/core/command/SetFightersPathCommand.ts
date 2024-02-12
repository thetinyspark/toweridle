import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import IPathService from "../service/IPathService";
import PathStrategyMode from "../model/enum/PathStrategyMode";

/**
 * Set fighters paths
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class SetFightersPathCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any;       
        const pathService:IPathService = facade.getService(AppConst.PATH_SERVICE) as IPathService;
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);
        if( bf === null )
            return false;

        bf.attackers.forEach( 
            (fighter)=>{
                fighter.path = pathService.findPath(fighter, bf, PathStrategyMode.TO_THE_DOOR);
            }
        );

        bf.defenders.forEach( 
            (fighter)=>{
                if( fighter === bf.door )
                    return;

                fighter.path = pathService.findPath(fighter, bf, PathStrategyMode.TO_THE_CLOSEST_ENEMY);
            }
        );

        return true;
    }
}