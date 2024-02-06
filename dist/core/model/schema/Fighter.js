"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fighter {
    id;
    tplID;
    name;
    speed;
    range;
    phyAtk;
    phyDef;
    magAtk;
    magDef;
    hp;
    constructor(id = -1, tplID = -1, name = "", speed = 0, range = 0, phyAtk = 0, phyDef = 0, magAtk = 0, magDef = 0, hp = 0) {
        this.id = id;
        this.tplID = tplID;
        this.name = name;
        this.speed = speed;
        this.range = range;
        this.phyAtk = phyAtk;
        this.phyDef = phyDef;
        this.magAtk = magAtk;
        this.magDef = magDef;
        this.hp = hp;
    }
}
exports.default = Fighter;
