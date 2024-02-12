import Spawner from "../../model/schema/Spawner";
import { SpawnerDescType } from "../../model/types/SpawnerDescType";
import IUIDService from "../IUIDService";
import IFactory from "./IFactory";
export default class SpawnerFactory implements IFactory {
    private _uidService;
    private _fighterFactory;
    constructor(_uidService: IUIDService, _fighterFactory: IFactory);
    fromData(desc: SpawnerDescType): Spawner;
}
