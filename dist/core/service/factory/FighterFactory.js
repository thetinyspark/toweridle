"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Fighter_1 = require("../../model/schema/Fighter");
class FighterFactory {
    _uidService;
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(desc) {
        const id = this._uidService.createUID("fighters");
        return new Fighter_1.default(id, desc.tplID, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
    }
}
exports.default = FighterFactory;
