import { DisplayObjectContainer, GameNode } from "@thetinyspark/moocaccino-barista";
import FighterType from "../types/FighterType";
import Lifebar from "./Lifebar";
export default class Fighter extends DisplayObjectContainer {
    info: FighterType;
    hp: number;
    row: number;
    col: number;
    targetX: number;
    targetY: number;
    private _path;
    private _lifebar;
    private _currentEnemy;
    private _nextTargetNode;
    addLifeBar(lifeBar: Lifebar): void;
    init(info: FighterType, row: number, col: number, size?: number): void;
    setPath(path: GameNode[]): void;
    getPath(): GameNode[];
    searchEnemy(enemies: Fighter[]): void;
    getCurrentEnemy(): Fighter | null;
    fight(): void;
    refresh(): void;
    getEnemiesAround(enemies: Fighter[]): Fighter[];
    getClosestEnemy(enemies: Fighter[]): any;
    calculateNextTargetNode(): void;
    move(cellSize?: number): void;
    isDead(): boolean;
    constructor();
}
