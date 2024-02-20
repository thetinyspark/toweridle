"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const PathStrategyMode_1 = require("../model/enum/PathStrategyMode");
const Utils_1 = require("../utils/Utils");
class PathService {
    constructor() {
        this._pathfinder = new utils_1.PathFinder2D();
    }
    findPath(fighter, battlefield, strategy) {
        const start = battlefield.grid.getAt(fighter.row, fighter.col);
        const door = battlefield.grid.getAt(battlefield.door.row, battlefield.door.col);
        let end = door;
        if (strategy === PathStrategyMode_1.default.TO_THE_CLOSEST_ENEMY) {
            const enemies = battlefield.attackers.includes(fighter) ? battlefield.defenders : battlefield.attackers;
            const closest = Utils_1.default.getClosestEnemyIn(enemies, fighter.row, fighter.col);
            if (closest == null)
                return [];
            const enemy = battlefield.grid.getAt(closest.row, closest.col);
            end = enemy;
        }
        // if enemy is in the same position than end node, then dont recalculate path
        if (fighter.path.length > 0) {
            const last = fighter.path[fighter.path.length - 1];
            if (last.state.row == end.state.row && last.state.col == end.state.col)
                return fighter.path;
        }
        this._pathfinder.resetGraphe(battlefield.grid);
        const path = this._pathfinder.findPath(battlefield.grid, start, end, false);
        if (path.length == 0)
            return path;
        if (path[0].state.row == fighter.row && path[0].state.col == fighter.col)
            path.shift();
        return path;
    }
}
exports.default = PathService;
