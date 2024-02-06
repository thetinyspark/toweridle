import SpawnerType from "./SpawnerType";

type BattfleFieldDataType = {
    data:number[][], 
    id:string, 
    cycleInMs:number,
    title:string, 
    targetRow:number,
    targetCol:number,
    attackerSpawners: SpawnerType[], 
    defenderSpawners: SpawnerType[]
};

export default BattfleFieldDataType;