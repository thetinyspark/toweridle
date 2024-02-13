"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(id, name, attackerID, defenderID, atkSpawners, dfdSpawners, door, targetRow, targetCol, grid, attackers = [], defenders = []) {
        this.id = id;
        this.name = name;
        this.attackerID = attackerID;
        this.defenderID = defenderID;
        this.atkSpawners = atkSpawners;
        this.dfdSpawners = dfdSpawners;
        this.door = door;
        this.targetRow = targetRow;
        this.targetCol = targetCol;
        this.grid = grid;
        this.attackers = attackers;
        this.defenders = defenders;
    }
}
exports.default = default_1;
