import { GameNode } from "../../../common/model/node";
import { Grid2D } from "../../../common/model/space/partitioning/grid";
import Fighter from "./Fighter";
import Spawner from "./Spawner";
export default class {
    id: number;
    name: string;
    attackerID: number;
    defenderID: number;
    atkSpawners: Spawner[];
    dfdSpawners: Spawner[];
    door: Fighter;
    targetRow: number;
    targetCol: number;
    grid: Grid2D<GameNode>;
    attackers: Fighter[];
    defenders: Fighter[];
    winners: Fighter[];
    deadDefenders: Fighter[];
    deadAttackers: Fighter[];
    constructor(id: number, name: string, attackerID: number, defenderID: number, atkSpawners: Spawner[], dfdSpawners: Spawner[], door: Fighter, targetRow: number, targetCol: number, grid: Grid2D<GameNode>, attackers?: Fighter[], defenders?: Fighter[], winners?: Fighter[], deadDefenders?: Fighter[], deadAttackers?: Fighter[]);
}
