import Fighter from "../../model/schema/Fighter";
import { FighterDescType } from "../../model/types/FighterDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";

export default class FighterFactory implements IFactory{

    constructor(private _uidService:IUIDService){
        this.fromData = this.fromData.bind(this);
    }

    fromData(desc:FighterDescType):Fighter{

        const id = this._uidService.createUID("fighters", desc.id);
        return new Fighter( 
            id, 
            desc.tplID,
            desc.name, 
            desc.speed, 
            desc.radius, 
            desc.phyAtk, 
            desc.phyDef, 
            desc.magAtk, 
            desc.magDef, 
            desc.hp
        );
    }
}