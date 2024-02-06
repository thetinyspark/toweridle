import { DisplayObject } from "@thetinyspark/moocaccino-barista";
import TextureFactory from "./TextureFactory";
import SpawnerType from "../types/SpawnerType";
import Spawner from "../view/Spawner";
import FighterType from "../types/FighterType";
import Fighter from "../view/Fighter";
import Lifebar from "../view/Lifebar";
export default class SpriteFactory {
    private _textureFactory;
    constructor(_textureFactory: TextureFactory);
    createDisplayObject(key: string): DisplayObject;
    createSpawner(from: SpawnerType, size?: number): Spawner;
    createMapElement(from: number, row: number, col: number, size?: number): DisplayObject;
    createFighter(from: FighterType, row: number, col: number, size?: number): Fighter;
    createLifebar(maxHP?: number): Lifebar;
}
