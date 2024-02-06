import { AssetsManager, IMAGE_TYPE, JSON_TYPE, Stage } from "@thetinyspark/moocaccino-barista";
import TextureFactory from "./factory/TextureFactory";
import SpriteFactory from "./factory/SpriteFactory";
import BattleField from "./view/BattfleField";
import { BattleFieldDescType } from "../core/model/types/BattleFieldDescType";
import BattfleFieldDataType from "./types/BattleFieldDataType";

export default class Main{

    private _battleField:BattleField; 
    private _textureFactory:TextureFactory;
    private _spriteFactory:SpriteFactory;
    private _stage:Stage;
    private _assetsManager:AssetsManager;

    public start(){
        this.onComplete = this.onComplete.bind(this); 
        this.renderLoop = this.renderLoop.bind(this); 
        this.load = this.load.bind(this);

        this._textureFactory = new TextureFactory();
        this._spriteFactory = new SpriteFactory(this._textureFactory);
        this._battleField = new BattleField(this._spriteFactory);

        this._assetsManager = new AssetsManager();
        this._stage = new Stage(); 
        this._stage.getCanvas().width = 640;
        this._stage.getCanvas().height = 480;
        document.body.appendChild(this._stage.getCanvas()); 

        this.renderLoop();
        this.load();
    }

    renderLoop(){
        this._battleField.refresh();
        this._stage.nextFrame();
        window.requestAnimationFrame(this.renderLoop);
    }

    async load(){
        this._assetsManager.queue("./assets/atlases/atlas_0.png", IMAGE_TYPE, "atlas0_png");
        this._assetsManager.queue("./assets/atlases/atlas_0.json", JSON_TYPE, "atlas0_json");
        this._assetsManager.queue("./assets/map/battlefield1.json", JSON_TYPE, "bf1_json");
        await this._assetsManager.loadQueue();

        this._textureFactory.init(this._assetsManager);
        this.onComplete();
    }

    onComplete(){
        const data:BattfleFieldDataType = this._assetsManager.get("bf1_json");
        this._battleField.init(data);
        this._stage.addChild(this._battleField);
    }
}