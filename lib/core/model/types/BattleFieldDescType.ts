import { SpawnerDescType } from "./SpawnerDescType";
import { FighterDescType } from "./FighterDescType";

export type BattleFieldDescType = {
    id:number, 
    name:string,
    attackerID:number, 
    defenderID:number,
    atkSpawners:SpawnerDescType[],
    dfdSpawners:SpawnerDescType[],
    door:FighterDescType,
    targetRow:number,
    targetCol:number,
    grid:number[][]
};