"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FighterTemplate_1 = require("../../model/schema/FighterTemplate");
class FighterTplFactory {
    _uidService;
    constructor(_uidService) {
        this._uidService = _uidService;
        this.fromData = this.fromData.bind(this);
    }
    fromData(desc) {
        const id = this._uidService.createUID("fighters_tpl", desc.id);
        return new FighterTemplate_1.default(id, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
    }
}
exports.default = FighterTplFactory;
