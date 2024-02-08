import { DisplayObjectContainer, GameNode } from "@thetinyspark/moocaccino-barista";
import FighterType from "../types/FighterType";
import Lifebar from "./Lifebar";
import MoveAlongPath from "../utils/MoveAlongPath";

export default class Fighter extends DisplayObjectContainer{
    public info:FighterType;
    public hp:number;
    public row:number = 0; 
    public col:number = 0;
    public targetX:number = 0;
    public targetY:number = 0;
    private _path:GameNode[] = [];
    private _lifebar:Lifebar = null;
    private _currentEnemy:Fighter|null = null;
    private _nextTargetNode:GameNode|null = null;
    private _mover:MoveAlongPath = new MoveAlongPath();


    public addLifeBar(lifeBar:Lifebar):void{
        this._lifebar = lifeBar;
        this.addChild(lifeBar);
    }

    public init(info:FighterType, row:number, col:number, size:number = 25){
        this.info = info;
        this.hp = this.info.hp;
        this.row = row;
        this.col = col;
        this.targetX = this.x = col * size;
        this.targetY = this.y = row * size;
        this.targetX = this.x;
        this.targetY = this.y;
    }

    public setPath(path:GameNode[]):void{
        this._path = path;
    }

    public getPath():GameNode[]{
        return this._path;
    }

    public searchEnemy(enemies:Fighter[]):void{
        const inRadius = this.getEnemiesAround(enemies);
        const enemy = this.getClosestEnemy(inRadius);
        this._currentEnemy =  enemy;
    }

    public getCurrentEnemy():Fighter|null{
        return this._currentEnemy;
    }

    public fight(){
        const enemy = this._currentEnemy;
        if( enemy == null )
            return;

        let phyDmg = this.info.atkPhy - enemy.info.defPhy;
        let magDmg = this.info.atkMag - enemy.info.defMag;
        phyDmg = phyDmg < 0 ? 0 : phyDmg;
        magDmg = magDmg < 0 ? 0 : magDmg;

        enemy.hp -= (phyDmg + magDmg);
        enemy.hp = enemy.hp < 0 ? 0 : enemy.hp;
        enemy.hp = enemy.hp > enemy.info.hp ? enemy.info.hp : enemy.hp;
    }

    public refresh():void{
        if( this._lifebar ){
            this._lifebar.refresh(this.hp);
        }
    }


    public getEnemiesAround(enemies:Fighter[]){

        const inRadius = enemies.filter( 
            (enemy:Fighter)=>{
                const distRow = enemy.row - this.row;
                const distCol = enemy.col - this.col;
                const dist = Math.abs( Math.sqrt( distRow * distRow + distCol * distCol) );
                return dist <= this.info.radius;
            }
        ); 
        return inRadius;
    }

    public getClosestEnemy(enemies:Fighter[]){

        let closest = null;
        let minDist = 0;
        for( let i = 0; i < enemies.length; i++ ){

            const enemy = enemies[i];
            const distRoW = enemy.row - this.row;
            const distCol = enemy.col - this.col;
            const dist = Math.abs( Math.sqrt( distRoW * distRoW + distCol * distCol) );

            if( i == 0 || dist < minDist ){
                closest = enemies[i];
                minDist = dist;
            }
        }
        return closest;
    }

    public calculateNextTargetNode(cellSize:number = 25):void{
        const path = this._path;

        // si on est au bout du chemin alors on ne fait rien
        if( path.length == 0 ){
            this._nextTargetNode = null;
            return; 
        }

        // s'il ne reste plus assez de cases à parcourir, (par rapport à notre vitesse),
        // alors, la dernière case est forcément notre cible
        // NOTA BENE on ajoute + 1 car la case où l'on se trouve est comprise dans le chemin
        const numCells = Math.round(this.info.speed) + 1;

        if( path.length < numCells ){
            this._nextTargetNode = path[path.length-1];
        }
        else{
            this._nextTargetNode = path[numCells-1];
        }


        if( this._nextTargetNode === null )
        return;

        const index = this._path.indexOf(this._nextTargetNode);
        const minipath = this._path.slice(0,index+1);

        const points = minipath.map( 
            node=> {
                return {x: node.state.col * cellSize, y:node.state.row * cellSize};
            }
        ); 
        this._mover.calc(this, points, 60);
    }

    public interpolate(cellSize:number = 25){
        if( this._nextTargetNode === null || this._currentEnemy !== null )
            return;
        this._mover.nextFrame();
    }

    public move(){
        if( this._nextTargetNode === null || this._currentEnemy !== null )
            return;
        
        this.row = this._nextTargetNode.state.row;
        this.col = this._nextTargetNode.state.col;

        this.x = this.col * 25;
        this.y = this.row* 25;
        const index = this._path.indexOf(this._nextTargetNode);
        this._path.splice(0,index);
        this._nextTargetNode = null;
        return;
    }

    public isDead():boolean{
        return this.hp <= 0;
    }

    constructor(){
        super();
    }
}