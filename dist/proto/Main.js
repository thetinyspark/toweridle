"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
const TextureFactory_1 = require("./factory/TextureFactory");
const SpriteFactory_1 = require("./factory/SpriteFactory");
const BattfleField_1 = require("./view/BattfleField");
const BattleFieldEvent_1 = require("./event/BattleFieldEvent");
class Main {
    _battleField;
    _textureFactory;
    _spriteFactory;
    _stage;
    _assetsManager;
    _level;
    _gameOver = false;
    start() {
        this.cycleLoop = this.cycleLoop.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.gameOverHandler = this.gameOverHandler.bind(this);
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
    simulate() {
        let keepSimulate = true;
        const battlefield = new BattfleField_1.default(this._spriteFactory);
        const onGameOver = (notif) => {
            keepSimulate = false;
            console.log(notif.getPayload());
        };
        battlefield.init(this._level);
        battlefield.subscribe(BattleFieldEvent_1.default.GAME_OVER, onGameOver, 1);
        while (keepSimulate) {
            battlefield.doCycle();
        }
    }
    cycleLoop() {
        if (this._gameOver)
            return;
        this._battleField.doCycle();
        setTimeout(() => {
            this.cycleLoop();
        }, this._level.cycleInMs);
    }
    gameOverHandler(notif) {
        this._battleField.unsubscribeAll();
        this._gameOver = true;
        console.log("game over", notif.getPayload());
    }
    renderLoop() {
        // this._battleField.refresh();
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
        this._level = this._assetsManager.get("bf1_json");
        if (this._level.simulate) {
            console.time("simulation");
            this.simulate();
            console.timeEnd("simulation");
        }
        else {
            this._battleField.init(this._level);
            this._battleField.subscribe(BattleFieldEvent_1.default.GAME_OVER, this.gameOverHandler);
            this._stage.addChild(this._battleField);
            this.cycleLoop();
        }
    }
}
exports.default = Main;
