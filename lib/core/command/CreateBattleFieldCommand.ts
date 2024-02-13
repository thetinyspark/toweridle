import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import IFactory from "../service/factory/IFactory";
import BattleField from "../model/schema/BattleField";

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
    execute(notification: INotification): BattleField {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        
        const factory:IFactory = facade.getService(AppConst.BATTLEFIELD_FACTORY) as IFactory;
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = factory.fromData(data);
        bfRepo.add(bf);

        return bf;
    }
}