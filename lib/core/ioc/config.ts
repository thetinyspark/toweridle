import { Container, Facade, StoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "./app.const";
import SerializerService from "../service/SerializerService";
import UIDService from "../service/UIDService";
import { StartCommand } from "../command";
import FightersRepository from "../model/repository/FightersRepository";
import FighterFactory from "../service/factory/FighterFactory";
import FighterTplFactory from "../service/factory/FighterTplFactory";
import FightersTplRepository from "../model/repository/FightersTplRepository";

export function configIOC(container:Container){
    container.reset();
    container.register(AppConst.APP_FACADE                      ,   ()=>  new Facade()                                                                              , true      );

    //commands
    container.register(AppConst.START_APP                       ,   ()=>  new StartCommand()                                                                        , false     );

    // models
    container.register(AppConst.GAME_STORE_MODEL                ,   ()=>  new StoreModel()                                                                          , true      )

    // repositories
    container.register(AppConst.FIGHTERS_REPOSITORY             ,   ()=>  new FightersRepository(container.resolve(AppConst.GAME_STORE_MODEL), "fighters")          , true      );
    container.register(AppConst.FIGHTERS_TPL_REPOSITORY         ,   ()=>  new FightersTplRepository(container.resolve(AppConst.GAME_STORE_MODEL), "fighters_tpl")   , true      );

    // services
    container.register( AppConst.FIGHTER_TPL_FACTORY            ,   ()=>  new FighterTplFactory(container.resolve(AppConst.UID_SERVICE))                            , true      );
    container.register( AppConst.FIGHTER_FACTORY                ,   ()=>  new FighterFactory(container.resolve(AppConst.UID_SERVICE))                               , true      );
    container.register( AppConst.SERIALIZER_SERVICE             ,   ()=>  new SerializerService()                                                                   , true      );
    container.register( AppConst.UID_SERVICE                    ,   ()=>  new UIDService()                                                                          , true      );
    return container;
}

export function configFacade(container:Container){
    const facade = container.resolve(AppConst.APP_FACADE);

    // commands
    facade.registerCommand( AppConst.START_APP              , container.get(AppConst.START_APP)                     );

    //repositories
    facade.registerProxy( AppConst.FIGHTERS_REPOSITORY      , container.resolve(AppConst.FIGHTERS_REPOSITORY)       );
    facade.registerProxy( AppConst.FIGHTERS_TPL_REPOSITORY  , container.resolve(AppConst.FIGHTERS_TPL_REPOSITORY)   );

    // services
    facade.registerService( AppConst.UID_SERVICE            , container.resolve(AppConst.UID_SERVICE)               );
    facade.registerService( AppConst.SERIALIZER_SERVICE     , container.resolve(AppConst.SERIALIZER_SERVICE)        );
    facade.registerService( AppConst.FIGHTER_FACTORY        , container.resolve(AppConst.FIGHTER_FACTORY)           );
    facade.registerService( AppConst.FIGHTER_TPL_FACTORY    , container.resolve(AppConst.FIGHTER_TPL_FACTORY)       );
    return facade;
}
