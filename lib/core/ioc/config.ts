import { Container, Facade, StoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "./app.const";
import SerializerService from "../service/SerializerService";
import UIDService from "../service/UIDService";
import { StartCommand } from "../command";
import FightersRepository from "../model/repository/FightersRepository";
import FighterFactory from "../service/factory/FighterFactory";
import SpawnerFactory from "../service/factory/SpawnerFactory";
import SpawnersRepository from "../model/repository/SpawnersRepository";
import BattleFieldRepository from "../model/repository/BattleFieldRepository";
import BattleFieldFactory from "../service/factory/BattleFieldFactory";

export function configIOC(container:Container){
    container.reset();
    container.register(AppConst.APP_FACADE                      ,   ()=>  new Facade()                                                                              , true      );

    //commands
    container.register(AppConst.START_APP                       ,   ()=>  new StartCommand()                                                                        , false     );

    // models
    container.register(AppConst.GAME_STORE_MODEL                ,   ()=>  new StoreModel()                                                                          , true      )

    // repositories
    container.register(AppConst.FIGHTERS_REPOSITORY             ,   ()=>  new FightersRepository(container.resolve(AppConst.GAME_STORE_MODEL), "fighters")          , true      );
    container.register(AppConst.SPAWNERS_REPOSITORY             ,   ()=>  new SpawnersRepository(container.resolve(AppConst.GAME_STORE_MODEL), "spawners")          , true      );
    container.register(AppConst.BATTLEFIELD_REPOSITORY          ,   ()=>  new BattleFieldRepository(container.resolve(AppConst.GAME_STORE_MODEL), "battlefields")   , true      );

    // services
    container.register( AppConst.FIGHTER_FACTORY                ,   ()=>  new FighterFactory(container.resolve(AppConst.UID_SERVICE))                               , true      );
    container.register( AppConst.SERIALIZER_SERVICE             ,   ()=>  new SerializerService()                                                                   , true      );
    container.register( AppConst.UID_SERVICE                    ,   ()=>  new UIDService()                                                                          , true      );

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
    facade.registerCommand( AppConst.START_APP              , container.get(AppConst.START_APP)                     );

    //repositories
    facade.registerProxy( AppConst.FIGHTERS_REPOSITORY      , container.resolve(AppConst.FIGHTERS_REPOSITORY)       );
    facade.registerProxy( AppConst.SPAWNERS_REPOSITORY      , container.resolve(AppConst.SPAWNERS_REPOSITORY)       );
    facade.registerProxy( AppConst.BATTLEFIELD_REPOSITORY   , container.resolve(AppConst.BATTLEFIELD_REPOSITORY) );

    // services
    facade.registerService( AppConst.UID_SERVICE            , container.resolve(AppConst.UID_SERVICE)               );
    facade.registerService( AppConst.SERIALIZER_SERVICE     , container.resolve(AppConst.SERIALIZER_SERVICE)        );
    facade.registerService( AppConst.FIGHTER_FACTORY        , container.resolve(AppConst.FIGHTER_FACTORY)           );
    facade.registerService( AppConst.SPAWNER_FACTORY        , container.resolve(AppConst.SPAWNER_FACTORY)           );
    facade.registerService( AppConst.BATTLEFIELD_FACTORY    , container.resolve(AppConst.BATTLEFIELD_FACTORY)       );
    return facade;
}
