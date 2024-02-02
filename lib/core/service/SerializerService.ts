import Fighter from "../model/schema/city/Fighter";
import ISerializerService from "./ISerializerService";

export default class SerializerService implements ISerializerService{

    constructor(){
        this.serialize = this.serialize.bind(this);
        this.fighterToObject = this.fighterToObject.bind(this);
    }

    serialize(fighters:Fighter[]):any[]{
        return fighters.map(this.fighterToObject);
    }

    fighterToObject(fighter: Fighter) {
        return null;
    }
}