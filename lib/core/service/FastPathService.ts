import { GameNode } from "../../common/model/node";
import { PathFinder2D } from "../../common/utils";
import PathStrategyMode from "../model/enum/PathStrategyMode";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";
import Utils from "../utils/Utils";
import IPathService from "./IPathService";

export default class FastPathService implements IPathService{

    private _pathfinder:PathFinder2D;
    private _cache:any = {};
    constructor(){
        this._pathfinder = new PathFinder2D();
    }

    getPathFinder() {
        return this._pathfinder;
    }

    findPath(fighter: Fighter, battlefield: BattleField, strategy: PathStrategyMode): GameNode[] {
        const start = battlefield.grid.getAt(fighter.row, fighter.col);
        const door = battlefield.grid.getAt(battlefield.door.row, battlefield.door.col);
        let end:GameNode = door;
        

        if( strategy === PathStrategyMode.TO_THE_CLOSEST_ENEMY ){
            const enemies = battlefield.attackers.includes(fighter) ? battlefield.defenders : battlefield.attackers;
            const closest = fighter.enemy !== null ? fighter.enemy : Utils.getClosestEnemyIn(enemies, fighter.row, fighter.col);
            if( closest == null )
                return [];

            const enemy = battlefield.grid.getAt(closest.row, closest.col);
            end = enemy;
        }


        // if enemy is in the same position than end node, then don't recalculate path
        if( fighter.path.length > 0 ){
            const last = fighter.path[fighter.path.length-1];
            if( last.state.row == end.state.row && last.state.col == end.state.col){

                const path = fighter.path;
                if( path[0].state.row == fighter.row && path[0].state.col == fighter.col )
                    path.shift();

                return fighter.path;
            }
        }

        this._pathfinder.resetGraphe(battlefield.grid);
        const path = this._pathfinder.findPath(battlefield.grid, start, end, false );
        
        if( path.length == 0 ){
            return path;
        }

        if( path[0].state.row == fighter.row && path[0].state.col == fighter.col )
            path.shift();

        return path;
    }

    cachePath(key:string, path:GameNode[]){
        this._cache[key] = path;
    }
    getCachedPath(key:string):GameNode[]|null{
        return this._cache[key] || null;
    }
    hasCachedPath(key:string):boolean{
        return this._cache[key] !== undefined;
    }
}