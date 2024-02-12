import Fighter from "./Fighter";
export default class Spawner {
    id: number;
    name: string;
    ownerID: number;
    row: number;
    col: number;
    frequency: number;
    fighters: Fighter[];
    constructor(id: number, name: string, ownerID: number, row: number, col: number, frequency: number, fighters: Fighter[]);
}
