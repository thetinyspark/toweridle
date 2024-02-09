export default class AppConst{
    // facade
    static APP_FACADE:string                    = "AppFacade";

    // model
    static GAME_STORE_MODEL:string              = "GameStoreModel"

    // commands
    static START_APP:string                     = "StartApp";

    // queries
    static DO_CYCLE:string                      = "DoCycle";

    // repositories
    static FIGHTERS_REPOSITORY:string          = "FightersRepository";
    static SPAWNERS_REPOSITORY:string          = "SpawnersRepository";
    static BATTLEFIELD_REPOSITORY:string       = "BattleFieldRepository";

    // factories
    static FIGHTER_FACTORY:string              = "FighterFactory";
    static SPAWNER_FACTORY:string              = "SpawnerFactory";
    static BATTLEFIELD_FACTORY:string          = "BattleFieldFactory";
    
    // services
    static UID_SERVICE:string                  = "UIDService";
    static SERIALIZER_SERVICE:string           = "SerializerService";
}