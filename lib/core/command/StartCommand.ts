import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import IFactory from "../service/factory/IFactory";

/**
 * Adds a building to a city
 * 
 * example.ts
 * ```typescript
 * const data = {cityID: 1, tplID: 1};
 * Paradox.engine.getFacade().sendNotification(Paradox.appConstants.ADD_BUILDING_TO_CITY, data);
 * ```
 */
export default class StartCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        
        // const tplRepo = facade.getProxy(AppConst.FIGHTERS_TPL_REPOSITORY) as IRepository<FighterTemplate>;
        // const factory:IFactory = facade.getService(AppConst.FIGHTER_TPL_FACTORY) as IFactory;

        // data?.templates.forEach(
        //     (current:any)=>{
        //         tplRepo.add(factory.fromData(current));
        //     }
        // );
        return true;


        // const cityRepo = facade.getProxy(AppConst.CITY_REPOSITORY) as IRepository<City>;
        // const tpl = tplRepo.getOneBy('id',data.tplID);
        // const city = cityRepo.getOneBy('id',data.cityID);

        // if( tpl === null || city === null )
        //     return false;

        // city.buildings.push( factory.fromData({tplID: tpl.id}));
        // return true;
    }
}