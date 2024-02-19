import { Container, Facade } from "@thetinyspark/coffe-maker";
import { configFacade, configIOC } from "../lib/core/ioc/config";
import AppConst from "../lib/core/ioc/app.const";
import IUIDService from "../lib/core/service/IUIDService";
import Engine from "../lib/core/Engine";
import IRepository from "../lib/core/model/repository/IRepository";
import BattleField from "../lib/core/model/schema/BattleField";
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
    const battlefields = container.resolve(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
    const atkRepo = container.resolve(AppConst.DEAD_ATTACKERS_REPOSITORY) as IRepository<Fighter>;
    const defRepo = container.resolve(AppConst.DEAD_DEFENDERS_REPOSITORY) as IRepository<Fighter>;

    uidService.reset();
    battlefields.reset();
    atkRepo.reset();
    defRepo.reset();
    engine.init(container);
    engine.reset();
    return engine;
}