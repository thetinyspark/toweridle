import { GameNode, Grid2D } from "@thetinyspark/moocaccino-barista";
import Spawner from "../schema/Spawner";
export declare type BattleFieldDescType = {
    id: number;
    attackerID: number;
    defenderID: number;
    spawners: Spawner[];
    grid: Grid2D<GameNode>;
};
