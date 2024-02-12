import BattleField from "../../model/schema/BattleField";
import { BattleFieldDescType } from "../../model/types/BattleFieldDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class BattleFieldFactory implements IFactory {
    private _uidService;
    private _spawnerFactory;
    private _fighterFactory;
    constructor(_uidService: IUIDService, _spawnerFactory: IFactory, _fighterFactory: IFactory);
    fromData(desc: BattleFieldDescType): BattleField;
}
