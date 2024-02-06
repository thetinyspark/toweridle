import Fighter from "../../model/schema/Fighter";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class FighterFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(desc: any): Fighter;
}
