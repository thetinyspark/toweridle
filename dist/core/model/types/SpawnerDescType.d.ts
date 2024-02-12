import { FighterPoolDescType } from "./FighterPoolDescType";
export declare type SpawnerDescType = {
    id: number;
    ownerID: number;
    row: number;
    col: number;
    name: string;
    frequency: number;
    fighters: FighterPoolDescType[];
};
