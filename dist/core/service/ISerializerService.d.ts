import Fighter from "../model/schema/Fighter";
export default interface ISerializerService {
    serialize(fighters: Fighter[]): any[];
    fighterToObject(fighter: Fighter): any;
}
