import { Grid2D } from "../../../common/model/space/partitioning/grid";
import { PathFinder2D } from "../../../common/utils";
import BattleField from "../../model/schema/BattleField";
import { BattleFieldDescType } from "../../model/types/BattleFieldDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class BattleFieldFactory implements IFactory{

    constructor(
        private _uidService:IUIDService, 
        private _spawnerFactory:IFactory, 
        private _fighterFactory:IFactory, 
    ){
        this.fromData = this.fromData.bind(this);
    }

    fromData(desc:BattleFieldDescType):BattleField{
        const id = this._uidService.createUID("battlefields", desc.id);
        const spawnersAtk = desc.atkSpawners.map( this._spawnerFactory.fromData );
        const spawnersDfd = desc.dfdSpawners.map( this._spawnerFactory.fromData );
        const door = this._fighterFactory.fromData(desc.door);
        const pathfinder = new PathFinder2D(); 
        const grid = pathfinder.createGraphe(Grid2D.from(desc.grid), 0);

        door.row = desc.targetRow;
        door.col = desc.targetCol;
        const bf = new BattleField( 
            id, 
            desc.name, 
            desc.attackerID, 
            desc.defenderID, 
            spawnersAtk, 
            spawnersDfd, 
            door, 
            desc.targetRow, 
            desc.targetCol, 
            grid, 
            [], 
            [door]
        ); 


        return bf;
    }
}