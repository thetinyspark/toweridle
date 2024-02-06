import Fighter from "../schema/Fighter";
export declare type SpawnerTemplateDescType = {
    id: number;
    ownerID: number;
    row: number;
    col: number;
    name: string;
    fighters: Fighter[];
};
