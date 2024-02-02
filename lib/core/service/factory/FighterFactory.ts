import Fighter from "../../model/schema/city/Fighter";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class FighterFactory implements IFactory{

    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(desc:any):Fighter{
        const id = this._uidService.createUID("fighters");
        return new Fighter( id, desc.tplID, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
    }
}