"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFacade = exports.configIOC = void 0;
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = require("./app.const");
const SerializerService_1 = require("../service/SerializerService");
const UIDService_1 = require("../service/UIDService");
const command_1 = require("../command");
const FightersRepository_1 = require("../model/repository/FightersRepository");
const FighterFactory_1 = require("../service/factory/FighterFactory");
const FighterTplFactory_1 = require("../service/factory/FighterTplFactory");
const FightersTplRepository_1 = require("../model/repository/FightersTplRepository");
function configIOC(container) {
    container.reset();
    container.register(app_const_1.default.APP_FACADE, () => new coffe_maker_1.Facade(), true);
    //commands
    container.register(app_const_1.default.START_APP, () => new command_1.StartCommand(), false);
    // models
    container.register(app_const_1.default.GAME_STORE_MODEL, () => new coffe_maker_1.StoreModel(), true);
    // repositories
    container.register(app_const_1.default.FIGHTERS_REPOSITORY, () => new FightersRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "fighters"), true);
    container.register(app_const_1.default.FIGHTERS_TPL_REPOSITORY, () => new FightersTplRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "fighters_tpl"), true);
    // services
    container.register(app_const_1.default.FIGHTER_TPL_FACTORY, () => new FighterTplFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.FIGHTER_FACTORY, () => new FighterFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.SERIALIZER_SERVICE, () => new SerializerService_1.default(), true);
    container.register(app_const_1.default.UID_SERVICE, () => new UIDService_1.default(), true);
    return container;
}
exports.configIOC = configIOC;
function configFacade(container) {
    const facade = container.resolve(app_const_1.default.APP_FACADE);
    // commands
    facade.registerCommand(app_const_1.default.START_APP, container.get(app_const_1.default.START_APP));
    //repositories
    facade.registerProxy(app_const_1.default.FIGHTERS_REPOSITORY, container.resolve(app_const_1.default.FIGHTERS_REPOSITORY));
    facade.registerProxy(app_const_1.default.FIGHTERS_TPL_REPOSITORY, container.resolve(app_const_1.default.FIGHTERS_TPL_REPOSITORY));
    // services
    facade.registerService(app_const_1.default.UID_SERVICE, container.resolve(app_const_1.default.UID_SERVICE));
    facade.registerService(app_const_1.default.SERIALIZER_SERVICE, container.resolve(app_const_1.default.SERIALIZER_SERVICE));
    facade.registerService(app_const_1.default.FIGHTER_FACTORY, container.resolve(app_const_1.default.FIGHTER_FACTORY));
    facade.registerService(app_const_1.default.FIGHTER_TPL_FACTORY, container.resolve(app_const_1.default.FIGHTER_TPL_FACTORY));
    return facade;
}
exports.configFacade = configFacade;
