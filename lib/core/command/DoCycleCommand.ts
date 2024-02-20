import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";
import { GameOverInfoType } from "../model/types/GameOverInfoType";
import path = require("path");

/**
 * process an entire cycle
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class DoCycleCommand implements ICommand{

    async execute(notification: INotification): Promise<GameOverInfoType|boolean> {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any;       
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);
        const complete = data.complete === true;
        const slow = data.optimize == false;
        let info = null;
        if( bf === null )
            return false;

        
        info = await this._processCycle(facade, bf, data.numCycle,!slow);
        if( !complete || info.gameover)
            return info;

        let count = 0;
        while(info.gameover == false && count < 10000){
            count++;
            data.numCycle++;
            info = await this._processCycle(facade, bf, data.numCycle, !slow);
        }
        return info;
    }

    private async _processCycle(facade: Facade, bf:BattleField, numCycle:number, optimize:boolean = false):Promise<GameOverInfoType>{
        await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id:bf.id, numCycle:numCycle});
        await facade.query(AppConst.SEARCH_FOR_ENNEMIES, {id:bf.id});
        await facade.query(AppConst.SET_FIGHTERS_PATH, {id:bf.id, optimize});
        await facade.query(AppConst.MOVE_FIGHTERS, {id:bf.id});
        await facade.query(AppConst.FIGHT, {id:bf.id});
        await facade.query(AppConst.REMOVE_DEAD_FIGHTERS, {id:bf.id});
        await facade.query(AppConst.REMOVE_WINNERS, {id:bf.id});
        return await facade.query(AppConst.GAME_OVER, {id:bf.id});
    }
}