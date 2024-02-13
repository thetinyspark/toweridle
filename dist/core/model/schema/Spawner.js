"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Spawner {
    constructor(id, name, ownerID, row, col, frequency, fighters) {
        this.id = id;
        this.name = name;
        this.ownerID = ownerID;
        this.row = row;
        this.col = col;
        this.frequency = frequency;
        this.fighters = fighters;
    }
}
exports.default = Spawner;
