import { GameNode } from "@thetinyspark/moocaccino-barista";
import Fighter from "./Fighter";
export default class Spawner extends GameNode {
    id: number;
    ownerID: number;
    name: string;
    row: number;
    col: number;
    fighters: Fighter[];
    constructor(id: number, ownerID: number, name: string, row: number, col: number, fighters: Fighter[]);
}
