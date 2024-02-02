import FighterTemplate from "../../model/schema/city/FighterTemplate";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class FighterTplFactory implements IFactory{

    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(desc:any):FighterTemplate{
        const id = this._uidService.createUID("fighters_tpl",desc.id);
        return new FighterTemplate( id, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
    }
}