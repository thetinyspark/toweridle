import { GameNode } from "../../../common/model/node";
import { Grid2D } from "../../../common/model/space/partitioning/grid";
import Fighter from "./Fighter";
import Spawner from "./Spawner";

export default class 
{
    constructor(
        public id:number, 
        public name:string,
        public attackerID:number, 
        public defenderID:number,
        public atkSpawners:Spawner[],
        public dfdSpawners:Spawner[],
        public door:Fighter,
        public targetRow:number,
        public targetCol:number,
        public grid:Grid2D<GameNode>,
        public attackers:Fighter[] = [], 
        public defenders:Fighter[] = [], 
        public winners:Fighter[] = [], 
        public deadDefenders:Fighter[] = [], 
        public deadAttackers:Fighter[] = [], 
    ){}
}