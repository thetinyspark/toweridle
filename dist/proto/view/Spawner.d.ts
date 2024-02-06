import { DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
import SpawnerType from "../types/SpawnerType";
import Fighter from "./Fighter";
import SpriteFactory from "../factory/SpriteFactory";
export default class Spawner extends DisplayObjectContainer {
    info: SpawnerType;
    private _fighters;
    private _numCycle;
    constructor();
    doCycle(factory: SpriteFactory): Fighter | null;
    removeFighter(fighter: Fighter): void;
    getFighters(): Fighter[];
}
