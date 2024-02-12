import { GameNode } from "../../../common/model/node";
export default class Fighter {
    id: number;
    tplID: number;
    name: string;
    speed: number;
    radius: number;
    phyAtk: number;
    phyDef: number;
    magAtk: number;
    magDef: number;
    hp: number;
    row: number;
    col: number;
    enemy: Fighter;
    path: GameNode[];
    constructor(id: number, tplID: number, name: string, speed: number, radius: number, phyAtk: number, phyDef: number, magAtk: number, magDef: number, hp: number, row?: number, col?: number, enemy?: Fighter, path?: GameNode[]);
}
