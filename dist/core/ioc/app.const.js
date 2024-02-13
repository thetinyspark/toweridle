"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConst {
    // facade
    static APP_FACADE = "AppFacade";
    // model
    static GAME_STORE_MODEL = "GameStoreModel";
    // commands
    static FIGHT = "Fight";
    static GAME_OVER = "GameOver";
    static REMOVE_WINNERS = "RemoveWinners";
    static MOVE_FIGHTERS = "MoveFighters";
    static REMOVE_DEAD_FIGHTERS = "RemoveDeadFighters";
    static SET_FIGHTERS_PATH = "SetFightersPath";
    static CREATE_BATTLEFIELD = "CreateBattleField";
    static SPAWN_NEW_FIGHTERS = "SpawnNewFighters";
    static SEARCH_FOR_ENNEMIES = "SearchForEnnemies";
    static DO_CYCLE = "DoCycle";
    // repositories
    static WINNERS_REPOSITORY = "WinnersRepository";
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
