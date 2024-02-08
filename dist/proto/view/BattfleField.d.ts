import { DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
import SpriteFactory from "../factory/SpriteFactory";
import BattfleFieldDataType from "../types/BattleFieldDataType";
import Fighter from "./Fighter";
export default class BattleField extends DisplayObjectContainer {
    private _spriteFactory;
    private _attackersBeyondGate;
    private _spawnersAtk;
    private _spawnersDfd;
    private _level;
    private _pathfinder;
    private _graphe;
    private _door;
    constructor(_spriteFactory: SpriteFactory);
    init(level: BattfleFieldDataType): void;
    initDoor(): void;
    getDefenders(withDoor?: boolean): Fighter[];
    getAttackers(): Fighter[];
    fight(): void;
    checkAttackersBeyondDoor(): void;
    refreshLifebars(): void;
    moveFighters(): void;
    predictNextTargetNodes(): void;
    setFightersPath(): void;
    searchForEnemies(): void;
    spawnNewFighters(): void;
    checkGameOver(): void;
    doCycle(): void;
}