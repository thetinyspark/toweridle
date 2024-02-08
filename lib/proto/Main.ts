import { AssetsManager, IMAGE_TYPE, INotification, JSON_TYPE, Stage } from "@thetinyspark/moocaccino-barista";
import TextureFactory from "./factory/TextureFactory";
import SpriteFactory from "./factory/SpriteFactory";
import BattleField from "./view/BattfleField";
import BattfleFieldDataType from "./types/BattleFieldDataType";
import BattleFieldEvent from "./event/BattleFieldEvent";

export default class Main{

    private _battleField:BattleField; 
    private _textureFactory:TextureFactory;
    private _spriteFactory:SpriteFactory;
    private _stage:Stage;
    private _assetsManager:AssetsManager;
    private _level:BattfleFieldDataType
    private _gameOver:boolean = false;

    public start(){
        this.cycleLoop = this.cycleLoop.bind(this); 
        this.onComplete = this.onComplete.bind(this); 
        this.gameOverHandler = this.gameOverHandler.bind(this); 
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

    simulate(){
        let keepSimulate = true;
        const  battlefield = new BattleField(this._spriteFactory);
        const onGameOver = (notif:INotification)=>{
            keepSimulate = false;
            console.log(notif.getPayload());
        };  
        battlefield.init(this._level);
        battlefield.subscribe(BattleFieldEvent.GAME_OVER, onGameOver, 1);
        while(keepSimulate){
            battlefield.doCycle();
        }
    }

    cycleLoop(){
        if( this._gameOver )
            return; 

        this._battleField.doCycle(); 
        setTimeout( 
            ()=>{
                this.cycleLoop()
            }, 
            this._level.cycleInMs
        )
    }

    gameOverHandler(notif:INotification){
        this._battleField.unsubscribeAll();
        this._gameOver = true;
        console.log("game over", notif.getPayload());
    }

    renderLoop(){
        this._battleField.interpolate();
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
        this._level = this._assetsManager.get("bf1_json");

        if( (this._level as any).simulate){
            console.time("simulation");
            this.simulate();
            console.timeEnd("simulation");
        }
        else{   
            this._battleField.init(this._level);
            this._battleField.subscribe(BattleFieldEvent.GAME_OVER, this.gameOverHandler);
            this._stage.addChild(this._battleField);
            this.cycleLoop();
        }
    }
}