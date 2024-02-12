"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fighter {
    id;
    tplID;
    name;
    speed;
    radius;
    phyAtk;
    phyDef;
    magAtk;
    magDef;
    hp;
    row;
    col;
    enemy;
    path;
    constructor(id, tplID, name, speed, radius, phyAtk, phyDef, magAtk, magDef, hp, row = 0, col = 0, enemy = null, path = []) {
        this.id = id;
        this.tplID = tplID;
        this.name = name;
        this.speed = speed;
        this.radius = radius;
        this.phyAtk = phyAtk;
        this.phyDef = phyDef;
        this.magAtk = magAtk;
        this.magDef = magDef;
        this.hp = hp;
        this.row = row;
        this.col = col;
        this.enemy = enemy;
        this.path = path;
    }
}
exports.default = Fighter;
