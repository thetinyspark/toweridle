import { Container, Facade} from "@thetinyspark/coffe-maker";
import { Emitter } from "@thetinyspark/tiny-observer";
import AppConst from "./ioc/app.const";
import { configFacade, configIOC } from "./ioc/config";
import { version } from "../version";
import IUIDService from "./service/IUIDService";
import IRepository from "./model/repository/IRepository";
import Fighter from "./model/schema/Fighter";
import BattleField from "./model/schema/BattleField";
/**
 * The Engine object represents the main gateway between you and the paradox engine's core.
 */
export default class Engine extends Emitter{
    private _facade:Facade; 
    private _container:Container;

    constructor(){
        super();
    }

    /**
     * Reset data but keeps configuration
     */
    reset(){
        const uidService    = this._container.resolve(AppConst.UID_SERVICE) as IUIDService;
        const battlefields  = this._container.resolve(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;

        uidService.reset();
        battlefields.reset();
    }

    /**
     * Init the engine, and restores game data
     * @param container a Container's instance
     * @param configuration game data to restore
     */
    init(container:Container){
        container.reset();
        configIOC(container);
        configFacade(container);
        this._facade = container.resolve(AppConst.APP_FACADE) as Facade;
        this._container = container;

        // reset
        this.reset();
    }
    /**
     * Returns a version num
     * @returns string
     */
    getVersion(){
        return version;
    }
    /**
     * Returns the Facade which is used to dispatch commands and queries.
     * @returns Facade
     */
    getFacade(){
        return this._facade;
    }


    /**
     * Processes a cycle. A cycle means that productions are added 
     * to cities's wallets and consumptions are removed from them too. 
     * 
     * example.ts
     * ```typescript
     * Paradox.engine.doCycle()
     * ```
     */
    doCycle(){
        this.getFacade().sendNotification(AppConst.DO_CYCLE);
    }

}