export default class AppConst{
    // facade
    static APP_FACADE:string                    = "AppFacade";

    // model
    static GAME_STORE_MODEL:string              = "GameStoreModel"

    // commands
    static FIGHT:string                         = "Fight";
    static GAME_OVER:string                     = "GameOver";
    static REMOVE_WINNERS:string                = "RemoveWinners";
    static MOVE_FIGHTERS:string                 = "MoveFighters";
    static REMOVE_DEAD_FIGHTERS:string          = "RemoveDeadFighters";
    static SET_FIGHTERS_PATH:string             = "SetFightersPath";
    static CREATE_BATTLEFIELD:string            = "CreateBattleField";
    static SPAWN_NEW_FIGHTERS:string            = "SpawnNewFighters";
    static SEARCH_FOR_ENNEMIES:string           = "SearchForEnnemies";
    static DO_CYCLE:string                      = "DoCycle";

    // repositories
    static BATTLEFIELD_REPOSITORY:string       = "BattleFieldRepository";

    // factories
    static FIGHTER_FACTORY:string              = "FighterFactory";
    static SPAWNER_FACTORY:string              = "SpawnerFactory";
    static BATTLEFIELD_FACTORY:string          = "BattleFieldFactory";
    
    // services
    static PATH_SERVICE:string                 = "PathService";
    static UID_SERVICE:string                  = "UIDService";
    static SERIALIZER_SERVICE:string           = "SerializerService";
}