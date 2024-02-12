"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConst {
    // facade
    static APP_FACADE = "AppFacade";
    // model
    static GAME_STORE_MODEL = "GameStoreModel";
    // commands
    static FIGHT = "Fight";
    static MOVE_FIGHTERS = "MoveFighters";
    static SET_FIGHTERS_PATH = "SetFightersPath";
    static CREATE_BATTLEFIELD = "CreateBattleField";
    static SPAWN_NEW_FIGHTERS = "SpawnNewFighters";
    static SEARCH_FOR_ENNEMIES = "SearchForEnnemies";
    // queries
    static DO_CYCLE = "DoCycle";
    // repositories
    static FIGHTERS_REPOSITORY = "FightersRepository";
    static SPAWNERS_REPOSITORY = "SpawnersRepository";
    static BATTLEFIELD_REPOSITORY = "BattleFieldRepository";
    // factories
    static FIGHTER_FACTORY = "FighterFactory";
    static SPAWNER_FACTORY = "SpawnerFactory";
    static BATTLEFIELD_FACTORY = "BattleFieldFactory";
    // services
    static PATH_SERVICE = "PathService";
    static UID_SERVICE = "UIDService";
    static SERIALIZER_SERVICE = "SerializerService";
}
exports.default = AppConst;
