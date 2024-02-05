import Fighter from "../schema/Fighter";

export type SpawnerTemplateDescType = {
    id:number, 
    ownerID:number, 
    row: number,
    col: number,
    name:string,
    fighters:Fighter[]
};