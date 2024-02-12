"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("../../../common/model/space/partitioning/grid");
const utils_1 = require("../../../common/utils");
const BattleField_1 = require("../../model/schema/BattleField");
class BattleFieldFactory {
    _uidService;
    _spawnerFactory;
    _fighterFactory;
    constructor(_uidService, _spawnerFactory, _fighterFactory) {
        this._uidService = _uidService;
        this._spawnerFactory = _spawnerFactory;
        this._fighterFactory = _fighterFactory;
        this.fromData = this.fromData.bind(this);
    }
    fromData(desc) {
        const id = this._uidService.createUID("battlefields", desc.id);
        const spawnersAtk = desc.atkSpawners.map(this._spawnerFactory.fromData);
        const spawnersDfd = desc.dfdSpawners.map(this._spawnerFactory.fromData);
        const door = this._fighterFactory.fromData(desc.door);
        const pathfinder = new utils_1.PathFinder2D();
        const grid = pathfinder.createGraphe(grid_1.Grid2D.from(desc.grid), 0);
        door.row = desc.targetRow;
        door.col = desc.targetCol;
        const bf = new BattleField_1.default(id, desc.name, desc.attackerID, desc.defenderID, spawnersAtk, spawnersDfd, door, desc.targetRow, desc.targetCol, grid, [], [door]);
        return bf;
    }
}
exports.default = BattleFieldFactory;
