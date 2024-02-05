import { Container, Facade } from "@thetinyspark/coffe-maker";
import { configFacade, configIOC } from "../lib/core/ioc/config";
import AppConst from "../lib/core/ioc/app.const";
import IUIDService from "../lib/core/service/IUIDService";
import Engine from "../lib/core/Engine";
import IRepository from "../lib/core/model/repository/IRepository";
import Fighter from "../lib/core/model/schema/Fighter";

export function setup(container = new Container()){
    configIOC(container);
    const facade = configFacade(container) as Facade; 

    const uidService:IUIDService = facade.getService(AppConst.UID_SERVICE) as IUIDService;
    uidService.reset();
    return facade;
}

export function setupEngine(container = new Container()){
    const engine:Engine = new Engine();
    configIOC(container);

    const uidService:IUIDService = container.resolve(AppConst.UID_SERVICE) as IUIDService;
    const fighters = container.resolve(AppConst.FIGHTERS_REPOSITORY) as IRepository<Fighter>;

    uidService.reset();
    fighters.reset();
    engine.init(container);
    engine.reset();
    return engine;
}