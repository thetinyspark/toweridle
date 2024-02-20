import { GameNode } from "../../common/model/node";
import PathStrategyMode from "../model/enum/PathStrategyMode";
import BattleField from "../model/schema/BattleField";
import Fighter from "../model/schema/Fighter";
export default interface IPathService {
    findPath(fighter: Fighter, battlefield: BattleField, strategy: PathStrategyMode, optimize: boolean): GameNode[];
    getPathFinder(): any;
}
