import { Container, Facade} from "@thetinyspark/coffe-maker";
import { Emitter } from "@thetinyspark/tiny-observer";
import AppConst from "./ioc/app.const";
import { configFacade, configIOC } from "./ioc/config";
import { version } from "../version";
import IUIDService from "./service/IUIDService";
import IRepository from "./model/repository/IRepository";
import BattleField from "./model/schema/BattleField";
import { BattleFieldDescType } from "./model/types/BattleFieldDescType";
import { GameOverInfoType } from "./model/types/GameOverInfoType";
import Repository from "./model/repository/Repository";
/**
 * The Engine object represents the main gateway between you and the TowerIdle engine's core.
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
     * Creates a battlefield with proper configuration
     * @param data BattleFieldDescType
     * @returns Promise<boolean>
     */
    createBattleField(data:BattleFieldDescType):Promise<BattleField>{
        return this.getFacade().query(AppConst.CREATE_BATTLEFIELD, data);
    }

    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFields():BattleField[]{
        const repo = this.getFacade().getProxy(AppConst.BATTLEFIELD_REPOSITORY) as Repository<BattleField>;
        return repo.getAll();
    }

    /**
     * returns all battlefields
     * @returns BattleField[]
     */
    getBattleFieldByID(id:number):BattleField{
        const repo = this.getFacade().getProxy(AppConst.BATTLEFIELD_REPOSITORY) as Repository<BattleField>;
        return repo.getOneBy('id',id);
    }

    /**
     * Processes a cycle.
     * 
     * 
     * example.ts
     * ```typescript
     * TowerIdle.engine.doCycle(1,1)
     * ```
     */
    doCycle(battlefieldID:number, numCycle:number, untilGameOver:boolean = false):Promise<GameOverInfoType>{
        return this.getFacade().query(AppConst.DO_CYCLE, {id:battlefieldID, numCycle, complete:untilGameOver});
    }

}