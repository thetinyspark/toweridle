import { GameNode } from "../../common/model/node";
import { PathFinder2D } from "../../common/utils";
import PathStrategyMode from "../model/enum/PathStrategyMode";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";
import IPathService from "./IPathService";
export default class PathService implements IPathService {
    private _pathfinder;
    constructor();
    getPathFinder(): PathFinder2D;
    findPath(fighter: Fighter, battlefield: BattleField, strategy: PathStrategyMode, optimize?: boolean): GameNode[];
}
