import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import IFactory from "../service/factory/IFactory";
import BattleField from "../model/schema/BattleField";
import IPathService from "../service/IPathService";
import Fighter from "../model/schema/Fighter";
import PathStrategyMode from "../model/enum/PathStrategyMode";

/**
 * Load battlefied configuration and creates a battlefield
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class CreateBattleFieldCommand implements ICommand{
    execute(notification: INotification): boolean|BattleField {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        
        const factory:IFactory = facade.getService(AppConst.BATTLEFIELD_FACTORY) as IFactory;
        const path:IPathService = facade.getService(AppConst.PATH_SERVICE) as IPathService;
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = factory.fromData(data) as BattleField;

        // check if there is a path between each atk spawner and targetCol + targetRow
        const validPaths = bf.atkSpawners.map( 
            (spawner)=>{
                const from = new Fighter(1,1,"",1,1,1,1,1,1,1,1,spawner.row, spawner.col);
                const mypath = path.findPath(from,bf, PathStrategyMode.TO_THE_DOOR);
                if( mypath.length == 0 )
                    return false; 

                return true;
            }
        ); 

        if( validPaths.includes(false))
            return false;

        bfRepo.add(bf);

        return bf;
    }
}