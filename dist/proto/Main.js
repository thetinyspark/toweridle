"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
const TextureFactory_1 = require("./factory/TextureFactory");
const SpriteFactory_1 = require("./factory/SpriteFactory");
const BattfleField_1 = require("./view/BattfleField");
class Main {
    _battleField;
    _textureFactory;
    _spriteFactory;
    _stage;
    _assetsManager;
    start() {
        this.onComplete = this.onComplete.bind(this);
        this.renderLoop = this.renderLoop.bind(this);
        this.load = this.load.bind(this);
        this._textureFactory = new TextureFactory_1.default();
        this._spriteFactory = new SpriteFactory_1.default(this._textureFactory);
        this._battleField = new BattfleField_1.default(this._spriteFactory);
        this._assetsManager = new moocaccino_barista_1.AssetsManager();
        this._stage = new moocaccino_barista_1.Stage();
        this._stage.getCanvas().width = 640;
        this._stage.getCanvas().height = 480;
        document.body.appendChild(this._stage.getCanvas());
        this.renderLoop();
        this.load();
    }
    renderLoop() {
        this._battleField.refresh();
        this._stage.nextFrame();
        window.requestAnimationFrame(this.renderLoop);
    }
    async load() {
        this._assetsManager.queue("./assets/atlases/atlas_0.png", moocaccino_barista_1.IMAGE_TYPE, "atlas0_png");
        this._assetsManager.queue("./assets/atlases/atlas_0.json", moocaccino_barista_1.JSON_TYPE, "atlas0_json");
        this._assetsManager.queue("./assets/map/battlefield1.json", moocaccino_barista_1.JSON_TYPE, "bf1_json");
        await this._assetsManager.loadQueue();
        this._textureFactory.init(this._assetsManager);
        this.onComplete();
    }
    onComplete() {
        const data = this._assetsManager.get("bf1_json");
        this._battleField.init(data);
        this._stage.addChild(this._battleField);
    }
}
exports.default = Main;
