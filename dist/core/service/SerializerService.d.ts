import Fighter from "../model/schema/Fighter";
import ISerializerService from "./ISerializerService";
export default class SerializerService implements ISerializerService {
    constructor();
    serialize(fighters: Fighter[]): any[];
    fighterToObject(fighter: Fighter): any;
}
