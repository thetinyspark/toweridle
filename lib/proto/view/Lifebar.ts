import { DisplayObject, DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";

export default class Lifebar extends DisplayObjectContainer{

    public maxHP:number = 0;
    public currentHP:number = 0;

    constructor(){
        super();
    }

    public init( foreground:DisplayObject, background:DisplayObject, maxHP:number ){
        this.addChild(background);
        this.addChild(foreground);
        this.maxHP = this.currentHP = maxHP;
        foreground.scaleX = 1;
    }

    public refresh(hp:number){
        this.currentHP = hp;
        const foreground = this.getChildren()[1]; 
        if(!foreground )
            return; 
        
        foreground.scaleX = this.currentHP / this.maxHP;
    }


}