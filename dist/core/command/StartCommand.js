"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_const_1 = require("../ioc/app.const");
/**
 * Adds a building to a city
 *
 * example.ts
 * ```typescript
 * const data = {cityID: 1, tplID: 1};
 * Paradox.engine.getFacade().sendNotification(Paradox.appConstants.ADD_BUILDING_TO_CITY, data);
 * ```
 */
class StartCommand {
    execute(notification) {
        const facade = notification.getEmitter();
        const data = notification.getPayload();
        const tplRepo = facade.getProxy(app_const_1.default.FIGHTERS_TPL_REPOSITORY);
        const factory = facade.getService(app_const_1.default.FIGHTER_TPL_FACTORY);
        data?.templates.forEach((current) => {
            tplRepo.add(factory.fromData(current));
        });
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
exports.default = StartCommand;
