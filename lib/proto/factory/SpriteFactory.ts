import { DisplayObject, Texture } from "@thetinyspark/moocaccino-barista";
import TextureFactory from "./TextureFactory";
import SpawnerType from "../types/SpawnerType";
import Spawner from "../view/Spawner";
import FighterType from "../types/FighterType";
import Fighter from "../view/Fighter";
import Lifebar from "../view/Lifebar";
import Door from "../view/Door";

export default class SpriteFactory {
  constructor(private _textureFactory:TextureFactory){
    this.createDisplayObject = this.createDisplayObject.bind(this);
    this.createSpawner = this.createSpawner.bind(this);
    this.createMapElement = this.createMapElement.bind(this);
    this.createFighter = this.createFighter.bind(this);
  }

  public createDisplayObject(key: string): DisplayObject {
    const texture = this._textureFactory.getTextureByID(key) as Texture;
    const disp = DisplayObject.createFromTexture(texture);
    return disp as DisplayObject;
  }

  public createSpawner(from:SpawnerType, size:number = 25):Spawner{
    const base = this.createDisplayObject("spawner");
    const spawner = new Spawner(); 
    spawner.info = from;
    spawner.x = from.col * size;
    spawner.y = from.row * size;
    base.width = size;
    base.height = size;
    spawner.addChild(base);
    return spawner;
  }

  public createMapElement(from:number, row:number, col:number, size:number = 25):DisplayObject{
    const key = from == 1 ? "rock" : "grass";
    const disp = this.createDisplayObject(key);
    disp.x = col * size;
    disp.y = row * size;
    disp.width = size;
    disp.height = size;
    return disp;
  }
  
  public createFighter(from:FighterType, row:number, col:number, size:number = 25):Fighter{
    let key = ""; 
    switch( from.id){
      case 0 : key = "door"; break; 
      case 1 : key = "archer"; break; 
      case 2 : key = "monk"; break; 
      case 3 : key = "knight"; break; 
      case 4 : key = "wizard"; break; 
    }
    const disp = this.createDisplayObject(key);
    disp.width = size;
    disp.height = size;

    const lifebar = this.createLifebar(from.hp);
    const fighter = from.id == 0 ? new Door(): new Fighter();
    fighter.init(from, row, col, size);
    fighter.addChild(disp);
    fighter.addLifeBar(lifebar);
    return fighter;
  }

  public createLifebar(maxHP:number = 100):Lifebar{
    const foregroundTex = this._textureFactory.getTextureByID("lifebar");
    const backgroundText = this._textureFactory.getTextureByID("lifebardbgd");
    const foreground = DisplayObject.createFromTexture(foregroundTex) as DisplayObject; 
    const background = DisplayObject.createFromTexture(backgroundText) as DisplayObject; 
    const lifebar = new Lifebar();

    foreground.width = 25;
    foreground.height = 4;
    background.width = 25;
    background.height = 4;
    lifebar.init(foreground, background, maxHP); 

    return lifebar;
  }
}

