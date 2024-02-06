"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
class Lifebar extends moocaccino_barista_1.DisplayObjectContainer {
    maxHP = 0;
    currentHP = 0;
    constructor() {
        super();
    }
    init(foreground, background, maxHP) {
        this.addChild(background);
        this.addChild(foreground);
        this.maxHP = this.currentHP = maxHP;
        foreground.scaleX = 1;
    }
    refresh(hp) {
        this.currentHP = hp;
        const foreground = this.getChildren()[1];
        if (!foreground)
            return;
        foreground.scaleX = this.currentHP / this.maxHP;
    }
}
exports.default = Lifebar;
