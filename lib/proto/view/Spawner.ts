import { DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
import SpawnerType from "../types/SpawnerType";
import Fighter from "./Fighter";
import SpriteFactory from "../factory/SpriteFactory";

export default class Spawner extends DisplayObjectContainer{
    public info:SpawnerType;
    private _fighters:Fighter[] = [];
    private _numCycle:number = 0;

    constructor(){
        super();
    }

    doCycle(factory:SpriteFactory):Fighter|null{

        this._numCycle++;
        const alives = this._fighters.filter( f=>f.hp > 0 );

        // on produit les combattants un par un
        // et là il y en a encore au moins un en vie
        if( this.info.oneByOne && alives.length > 0 )
            return null;

        // si on produit tous les x cycles et qu'on n'a pas encore 
        // atteint ce cap, alors on ne fait rien
        if(!this.info.oneByOne && this._numCycle % this.info.frequency !== 0 )
            return null;

        // si la réserve de fighters est épuisée alors on ne retourne rien
        if( this.info.fighters.length == 0 )
            return null;

        
        
        let currentInfo = null; 

        while( currentInfo == null && this.info.fighters.length > 0){
            const nextInfo = this.info.fighters[0];
            if( nextInfo.amount > 0 ){
                currentInfo = nextInfo;
                break;
            }
            else{
                this.info.fighters.shift();
            }
        }

        if( currentInfo === null )
            return null;



        const fighter = factory.createFighter(currentInfo, this.info.row, this.info.col);
        this._fighters.push(fighter);
        currentInfo.amount--;
        return fighter;
    }

    public removeFighter(fighter:Fighter):void{
        this._fighters.splice( this._fighters.indexOf(fighter), 1 ); 
    }

    public getFighters():Fighter[]{
        return this._fighters;
    }
}