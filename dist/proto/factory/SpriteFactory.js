"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
const Spawner_1 = require("../view/Spawner");
const Fighter_1 = require("../view/Fighter");
const Lifebar_1 = require("../view/Lifebar");
class SpriteFactory {
    _textureFactory;
    constructor(_textureFactory) {
        this._textureFactory = _textureFactory;
        this.createDisplayObject = this.createDisplayObject.bind(this);
        this.createSpawner = this.createSpawner.bind(this);
        this.createMapElement = this.createMapElement.bind(this);
        this.createFighter = this.createFighter.bind(this);
    }
    createDisplayObject(key) {
        const texture = this._textureFactory.getTextureByID(key);
        const disp = moocaccino_barista_1.DisplayObject.createFromTexture(texture);
        return disp;
    }
    createSpawner(from, size = 25) {
        const base = this.createDisplayObject("spawner");
        const spawner = new Spawner_1.default();
        spawner.info = from;
        spawner.x = from.col * size;
        spawner.y = from.row * size;
        base.width = size;
        base.height = size;
        spawner.addChild(base);
        return spawner;
    }
    createMapElement(from, row, col, size = 25) {
        const key = from == 1 ? "rock" : "grass";
        const disp = this.createDisplayObject(key);
        disp.x = col * size;
        disp.y = row * size;
        disp.width = size;
        disp.height = size;
        return disp;
    }
    createFighter(from, row, col, size = 25) {
        let key = "";
        switch (from.id) {
            case 1:
                key = "archer";
                break;
            case 2:
                key = "monk";
                break;
            case 3:
                key = "knight";
                break;
            case 4:
                key = "wizard";
                break;
        }
        const disp = this.createDisplayObject(key);
        disp.width = size;
        disp.height = size;
        const lifebar = this.createLifebar(from.hp);
        const fighter = new Fighter_1.default();
        fighter.init(from, row, col, size);
        fighter.addChild(disp);
        fighter.addLifeBar(lifebar);
        return fighter;
    }
    createLifebar(maxHP = 100) {
        const foregroundTex = this._textureFactory.getTextureByID("lifebar");
        const backgroundText = this._textureFactory.getTextureByID("lifebardbgd");
        const foreground = moocaccino_barista_1.DisplayObject.createFromTexture(foregroundTex);
        const background = moocaccino_barista_1.DisplayObject.createFromTexture(backgroundText);
        const lifebar = new Lifebar_1.default();
        foreground.width = 25;
        foreground.height = 4;
        background.width = 25;
        background.height = 4;
        lifebar.init(foreground, background, maxHP);
        return lifebar;
    }
}
exports.default = SpriteFactory;
