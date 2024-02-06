"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializerService {
    constructor() {
        this.serialize = this.serialize.bind(this);
        this.fighterToObject = this.fighterToObject.bind(this);
    }
    serialize(fighters) {
        return fighters.map(this.fighterToObject);
    }
    fighterToObject(fighter) {
        return null;
    }
}
exports.default = SerializerService;
