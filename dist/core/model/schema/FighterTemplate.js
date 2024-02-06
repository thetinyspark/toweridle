"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FighterTemplate {
    id;
    name;
    speed;
    range;
    phyAtk;
    phyDef;
    magAtk;
    magDef;
    hp;
    constructor(id = -1, name = "", speed = 0, range = 0, phyAtk = 0, phyDef = 0, magAtk = 0, magDef = 0, hp = 0) {
        this.id = id;
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
exports.default = FighterTemplate;
