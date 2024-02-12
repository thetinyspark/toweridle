import { Facade, ICommand } from "@thetinyspark/coffe-maker";
import { INotification } from "@thetinyspark/tiny-observer";
import AppConst from "../ioc/app.const";
import IRepository from "../model/repository/IRepository";
import BattleField from "../model/schema/BattleField";

/**
 * Creates new fighters according to spawners configuration
 * 
 * example.ts
 * ```typescript
 * 
 * 
 * ```
 */
export default class SpawnNewFightersCommand implements ICommand{
    execute(notification: INotification): boolean {
        const facade:Facade = notification.getEmitter() as Facade;
        const data:any = notification.getPayload() as any; 
        const bfRepo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = bfRepo.getOneBy('id', data.id);

        if( bf === null )
            return false;

        bf.atkSpawners.forEach( 
            (spawner)=>{
                const condition1 = data.numCycle % spawner.frequency !== 0;
                const condition2 = spawner.fighters.length === 0;
                if( condition1 || condition2 )
                    return;

                bf.attackers.push(spawner.fighters.shift());
            }
        );

        bf.dfdSpawners.forEach( 
            (spawner)=>{
                const condition1 = data.numCycle % spawner.frequency !== 0;
                const condition2 = spawner.fighters.length === 0;
                if( condition1 || condition2 )
                    return;

                bf.defenders.push(spawner.fighters.shift());
            }
        );

        return true;
    }
}