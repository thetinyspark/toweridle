import { GameNode } from "../../common/model/node";
import { PathFinder2D } from "../../common/utils";
import PathStrategyMode from "../model/enum/PathStrategyMode";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";
import IPathService from "./IPathService";
export default class FastPathService implements IPathService {
    private _pathfinder;
    private _cache;
    constructor();
    getPathFinder(): PathFinder2D;
    findPath(fighter: Fighter, battlefield: BattleField, strategy: PathStrategyMode): GameNode[];
    cachePath(key: string, path: GameNode[]): void;
    getCachedPath(key: string): GameNode[] | null;
    hasCachedPath(key: string): boolean;
}
