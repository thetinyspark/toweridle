import { AssetsManager, DisplayObject, Texture } from "@thetinyspark/moocaccino-barista";

export default class TextureFactory{

    private _textures:Texture[] = [];
    private _data:Map<string,any>;

    constructor(){
        this._data = new Map<string,any>();
    }

    public init(manager:AssetsManager):void{
        this._data = manager.getAll();
        this._createTextures(this._data, "atlas0_png", "atlas0_json", "main");
    }

    private _createTextures(data:Map<string,any>, imgKey:string, jsonKey:string, textureID:string):void{
        const mainTextureSource = data.get(imgKey);
        const json = data.get(jsonKey);
        const main = Texture.createFromSource(textureID, mainTextureSource);
        const subdata = json.zones.map( (zone:any)=> {
          return {id:zone.id, sx: zone.x, sy: zone.y, sw: zone.width, sh:zone.height};
        });
        const sub = main.createSubTextures(subdata);
        sub.forEach( (t)=>{this._textures.push(t);});
      }
    
  
    public getData():Map<string, any>{
      return this._data;
    }
  
    public getTextureByID(id:string):Texture|null{
      return this._textures.find( t=>t.id === id)|| null;
    }

}