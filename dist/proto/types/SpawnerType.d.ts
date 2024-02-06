import FighterType from "./FighterType";
declare type SpawnerType = {
    id: number;
    ownerID: number;
    fighters: FighterType[];
    row: number;
    col: number;
    oneByOne: boolean;
    frequency: number;
};
export default SpawnerType;
