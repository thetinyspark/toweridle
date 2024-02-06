"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
class Spawner extends moocaccino_barista_1.GameNode {
    id;
    ownerID;
    name;
    row;
    col;
    fighters;
    constructor(id, ownerID, name, row, col, fighters) {
        super();
        this.id = id;
        this.ownerID = ownerID;
        this.name = name;
        this.row = row;
        this.col = col;
        this.fighters = fighters;
    }
}
exports.default = Spawner;
