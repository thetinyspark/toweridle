import { Container, Facade, StoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "./app.const";
import UIDService from "../service/UIDService";
import FighterFactory from "../service/factory/FighterFactory";
import SpawnerFactory from "../service/factory/SpawnerFactory";
import BattleFieldRepository from "../model/repository/BattleFieldRepository";
import BattleFieldFactory from "../service/factory/BattleFieldFactory";
import PathService from "../service/PathService";
import { 
    CreateBattleFieldCommand, 
    SpawnNewFightersCommand, 
    SearchForEnnemiesCommand,
    SetFightersPathCommand , 
    MoveFightersCommand,
    GameOverCommand,
    RemoveDeadFightersCommand,
    RemoveWinnersCommand,
    FightCommand,
    DoCycleCommand
} from "../command";

export function configIOC(container:Container){
    container.reset();
    container.register(AppConst.APP_FACADE                      ,   ()=>  new Facade()                                                                              , true      );

    //commands
    container.register(AppConst.DO_CYCLE                        ,   ()=>  new DoCycleCommand()                                                                      , false     );
    container.register(AppConst.GAME_OVER                       ,   ()=>  new GameOverCommand()                                                                     , false     );
    container.register(AppConst.FIGHT                           ,   ()=>  new FightCommand()                                                                        , false     );
    container.register(AppConst.REMOVE_WINNERS                  ,   ()=>  new RemoveWinnersCommand()                                                                , false     );
    container.register(AppConst.REMOVE_DEAD_FIGHTERS            ,   ()=>  new RemoveDeadFightersCommand()                                                           , false     );
    container.register(AppConst.MOVE_FIGHTERS                   ,   ()=>  new MoveFightersCommand()                                                                 , false     );
    container.register(AppConst.SET_FIGHTERS_PATH               ,   ()=>  new SetFightersPathCommand()                                                              , false     );
    container.register(AppConst.CREATE_BATTLEFIELD              ,   ()=>  new CreateBattleFieldCommand()                                                            , false     );
    container.register(AppConst.SPAWN_NEW_FIGHTERS              ,   ()=>  new SpawnNewFightersCommand()                                                             , false     );
    container.register(AppConst.SEARCH_FOR_ENNEMIES             ,   ()=>  new SearchForEnnemiesCommand()                                                            , false     );

    // models
    container.register(AppConst.GAME_STORE_MODEL                ,   ()=>  new StoreModel()                                                                          , true      )

    // repositories
    container.register(AppConst.BATTLEFIELD_REPOSITORY          ,   ()=>  new BattleFieldRepository(container.resolve(AppConst.GAME_STORE_MODEL), "battlefields")   , true      );
    container.register(AppConst.WINNERS_REPOSITORY              ,   ()=>  new BattleFieldRepository(container.resolve(AppConst.GAME_STORE_MODEL), "winners")        , true      );
    container.register(AppConst.DEAD_ATTACKERS_REPOSITORY       ,   ()=>  new BattleFieldRepository(container.resolve(AppConst.GAME_STORE_MODEL), "deadfenders")    , true      );
    container.register(AppConst.DEAD_DEFENDERS_REPOSITORY       ,   ()=>  new BattleFieldRepository(container.resolve(AppConst.GAME_STORE_MODEL), "deadtackers")    , true      );

    // services
    container.register( AppConst.FIGHTER_FACTORY                ,   ()=>  new FighterFactory(container.resolve(AppConst.UID_SERVICE))                               , true      );
    container.register( AppConst.UID_SERVICE                    ,   ()=>  new UIDService()                                                                          , true      );
    container.register( AppConst.PATH_SERVICE                   ,   ()=>  new PathService()                                                                         , true      );

    // complex services
    container.register( AppConst.SPAWNER_FACTORY,   
                        ()=>  new SpawnerFactory(
                            container.resolve(AppConst.UID_SERVICE), 
                            container.resolve(AppConst.FIGHTER_FACTORY)
                        ), 
                        true      
                    );

    container.register( AppConst.BATTLEFIELD_FACTORY,   
                        ()=>  new BattleFieldFactory(
                            container.resolve(AppConst.UID_SERVICE), 
                            container.resolve(AppConst.SPAWNER_FACTORY),
                            container.resolve(AppConst.FIGHTER_FACTORY)
                        ), 
                        true      
                    );
    return container;
}

export function configFacade(container:Container){
    const facade = container.resolve(AppConst.APP_FACADE);

    // commands
    facade.registerCommand( AppConst.DO_CYCLE               , container.get(AppConst.DO_CYCLE)                      );
    facade.registerCommand( AppConst.GAME_OVER              , container.get(AppConst.GAME_OVER)                     );
    facade.registerCommand( AppConst.FIGHT                  , container.get(AppConst.FIGHT)                         );
    facade.registerCommand( AppConst.REMOVE_DEAD_FIGHTERS   , container.get(AppConst.REMOVE_DEAD_FIGHTERS)          );
    facade.registerCommand( AppConst.MOVE_FIGHTERS          , container.get(AppConst.MOVE_FIGHTERS)                 );
    facade.registerCommand( AppConst.SET_FIGHTERS_PATH      , container.get(AppConst.SET_FIGHTERS_PATH)             );
    facade.registerCommand( AppConst.CREATE_BATTLEFIELD     , container.get(AppConst.CREATE_BATTLEFIELD)            );
    facade.registerCommand( AppConst.SPAWN_NEW_FIGHTERS     , container.get(AppConst.SPAWN_NEW_FIGHTERS)            );
    facade.registerCommand( AppConst.SEARCH_FOR_ENNEMIES    , container.get(AppConst.SEARCH_FOR_ENNEMIES)           );
    facade.registerCommand( AppConst.REMOVE_WINNERS         , container.get(AppConst.REMOVE_WINNERS)                );

    //repositories
    facade.registerProxy( AppConst.BATTLEFIELD_REPOSITORY   , container.resolve(AppConst.BATTLEFIELD_REPOSITORY)    );
    facade.registerProxy( AppConst.WINNERS_REPOSITORY       , container.resolve(AppConst.WINNERS_REPOSITORY)        );
    facade.registerProxy( AppConst.DEAD_ATTACKERS_REPOSITORY, container.resolve(AppConst.DEAD_ATTACKERS_REPOSITORY) );
    facade.registerProxy( AppConst.DEAD_DEFENDERS_REPOSITORY, container.resolve(AppConst.DEAD_DEFENDERS_REPOSITORY) );

    // services
    facade.registerService( AppConst.PATH_SERVICE           , container.resolve(AppConst.PATH_SERVICE)              );
    facade.registerService( AppConst.UID_SERVICE            , container.resolve(AppConst.UID_SERVICE)               );
    facade.registerService( AppConst.SERIALIZER_SERVICE     , container.resolve(AppConst.SERIALIZER_SERVICE)        );
    facade.registerService( AppConst.FIGHTER_FACTORY        , container.resolve(AppConst.FIGHTER_FACTORY)           );
    facade.registerService( AppConst.SPAWNER_FACTORY        , container.resolve(AppConst.SPAWNER_FACTORY)           );
    facade.registerService( AppConst.BATTLEFIELD_FACTORY    , container.resolve(AppConst.BATTLEFIELD_FACTORY)       );
    return facade;
}
