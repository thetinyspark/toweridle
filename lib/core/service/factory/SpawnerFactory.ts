import Spawner from "../../model/schema/Spawner";
import { SpawnerDescType } from "../../model/types/SpawnerDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class SpawnerFactory implements IFactory{

    constructor(private _uidService:IUIDService, private _fighterFactory:IFactory){
        this.fromData = this.fromData.bind(this);
    }

    fromData(desc:SpawnerDescType):Spawner{

        const id = this._uidService.createUID("spawners", desc.id);
        const fighters = desc.fighters.flatMap(
            (poolDesc)=>{
                const results = []; 
                for( let i = 0; i < poolDesc.amount; i++ ){
                    const fighter = this._fighterFactory.fromData(poolDesc.desc);
                    fighter.active = false; 
                    fighter.row = desc.row;
                    fighter.col = desc.col;
                    results.push(fighter);
                }
                return results;
            }
        );

        const spawner = new Spawner(
            id, 
            desc.name, 
            desc.ownerID, 
            desc.row, 
            desc.col, 
            desc.frequency, 
            fighters
        )

        return spawner;
    }
}