import { DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
import SpriteFactory from "../factory/SpriteFactory";
import BattfleFieldDataType from "../types/BattleFieldDataType";
export default class BattleField extends DisplayObjectContainer {
    private _spriteFactory;
    private _spawnersAtk;
    private _spawnersDfd;
    private _level;
    private _pathfinder;
    private _graphe;
    constructor(_spriteFactory: SpriteFactory);
    init(level: BattfleFieldDataType): void;
    fight(): void;
    refresh(): void;
    cycleLoop(): void;
    doCycle(): void;
}
