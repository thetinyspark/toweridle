import FighterType from "./FighterType";

type SpawnerType = {
    id:number,
    ownerID:number,
    fighters:FighterType[], 
    row:number, 
    col:number, 
    oneByOne:boolean,
    frequency:number
};

export default SpawnerType;