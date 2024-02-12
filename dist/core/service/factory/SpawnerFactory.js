"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Spawner_1 = require("../../model/schema/Spawner");
class SpawnerFactory {
    _uidService;
    _fighterFactory;
    constructor(_uidService, _fighterFactory) {
        this._uidService = _uidService;
        this._fighterFactory = _fighterFactory;
        this.fromData = this.fromData.bind(this);
    }
    fromData(desc) {
        const id = this._uidService.createUID("spawners", desc.id);
        const fighters = desc.fighters.flatMap((poolDesc) => {
            const results = [];
            for (let i = 0; i < poolDesc.amount; i++) {
                const fighter = this._fighterFactory.fromData(poolDesc.desc);
                fighter.active = false;
                fighter.row = desc.row;
                fighter.col = desc.col;
                results.push(fighter);
            }
            return results;
        });
        const spawner = new Spawner_1.default(id, desc.name, desc.ownerID, desc.row, desc.col, desc.frequency, fighters);
        return spawner;
    }
}
exports.default = SpawnerFactory;
