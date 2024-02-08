import FighterType from "./FighterType";
import SpawnerType from "./SpawnerType";
declare type BattfleFieldDataType = {
    data: number[][];
    id: string;
    cycleInMs: number;
    title: string;
    targetRow: number;
    targetCol: number;
    attackerSpawners: SpawnerType[];
    defenderSpawners: SpawnerType[];
    door: FighterType;
};
export default BattfleFieldDataType;
