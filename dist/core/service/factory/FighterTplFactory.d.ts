import FighterTemplate from "../../model/schema/FighterTemplate";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class FighterTplFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(desc: any): FighterTemplate;
}
