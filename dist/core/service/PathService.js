"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const PathStrategyMode_1 = require("../model/enum/PathStrategyMode");
const Utils_1 = require("../utils/Utils");
class PathService {
    _pathfinder;
    constructor() {
        this._pathfinder = new utils_1.PathFinder2D();
    }
    findPath(fighter, battlefield, strategy) {
        const start = battlefield.grid.getAt(fighter.row, fighter.col);
        const door = battlefield.grid.getAt(battlefield.door.row, battlefield.door.col);
        const enemies = battlefield.attackers.includes(fighter) ? battlefield.defenders : battlefield.attackers;
        const closest = Utils_1.default.getClosestEnemyIn(enemies, fighter.row, fighter.col);
        const enemy = battlefield.grid.getAt(closest.row, closest.col);
        const end = strategy === PathStrategyMode_1.default.TO_THE_DOOR ? door : enemy;
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