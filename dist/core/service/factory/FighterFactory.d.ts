import Fighter from "../../model/schema/Fighter";
import { FighterDescType } from "../../model/types/FighterDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class FighterFactory implements IFactory {
    private _uidService;
    constructor(_uidService: IUIDService);
    fromData(desc: FighterDescType): Fighter;
}
