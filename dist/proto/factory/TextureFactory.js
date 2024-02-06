"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
class TextureFactory {
    _textures = [];
    _data;
    constructor() {
        this._data = new Map();
    }
    init(manager) {
        this._data = manager.getAll();
        this._createTextures(this._data, "atlas0_png", "atlas0_json", "main");
    }
    _createTextures(data, imgKey, jsonKey, textureID) {
        const mainTextureSource = data.get(imgKey);
        const json = data.get(jsonKey);
        const main = moocaccino_barista_1.Texture.createFromSource(textureID, mainTextureSource);
        const subdata = json.zones.map((zone) => {
            return { id: zone.id, sx: zone.x, sy: zone.y, sw: zone.width, sh: zone.height };
        });
        const sub = main.createSubTextures(subdata);
        sub.forEach((t) => { this._textures.push(t); });
    }
    getData() {
        return this._data;
    }
    getTextureByID(id) {
        return this._textures.find(t => t.id === id) || null;
    }
}
exports.default = TextureFactory;
