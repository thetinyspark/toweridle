import { DisplayObjectContainer, GameNode } from "@thetinyspark/moocaccino-barista";
import FighterType from "../types/FighterType";
import Lifebar from "./Lifebar";
export default class Fighter extends DisplayObjectContainer {
    info: FighterType;
    hp: number;
    targetX: number;
    targetY: number;
    private _path;
    private _lifebar;
    private _currentEnemy;
    addLifeBar(lifeBar: Lifebar): void;
    init(info: FighterType, row: number, col: number, size?: number): void;
    setPath(path: GameNode[]): void;
    getPath(): GameNode[];
    getRow(cellSize?: number): number;
    getCol(cellSize?: number): number;
    fight(enemies: Fighter[]): void;
    refresh(cellSize: number): void;
    getEnemiesAround(enemies: Fighter[]): Fighter[];
    getClosestEnemy(enemies: Fighter[]): any;
    move(cellSize?: number): void;
    constructor();
}
