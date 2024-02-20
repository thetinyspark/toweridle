"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFacade = exports.configIOC = void 0;
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const app_const_1 = require("./app.const");
const UIDService_1 = require("../service/UIDService");
const FighterFactory_1 = require("../service/factory/FighterFactory");
const SpawnerFactory_1 = require("../service/factory/SpawnerFactory");
const BattleFieldRepository_1 = require("../model/repository/BattleFieldRepository");
const BattleFieldFactory_1 = require("../service/factory/BattleFieldFactory");
const PathService_1 = require("../service/PathService");
const command_1 = require("../command");
function configIOC(container) {
    container.reset();
    container.register(app_const_1.default.APP_FACADE, () => new coffe_maker_1.Facade(), true);
    //commands
    container.register(app_const_1.default.DO_CYCLE, () => new command_1.DoCycleCommand(), false);
    container.register(app_const_1.default.GAME_OVER, () => new command_1.GameOverCommand(), false);
    container.register(app_const_1.default.FIGHT, () => new command_1.FightCommand(), false);
    container.register(app_const_1.default.REMOVE_WINNERS, () => new command_1.RemoveWinnersCommand(), false);
    container.register(app_const_1.default.REMOVE_DEAD_FIGHTERS, () => new command_1.RemoveDeadFightersCommand(), false);
    container.register(app_const_1.default.MOVE_FIGHTERS, () => new command_1.MoveFightersCommand(), false);
    container.register(app_const_1.default.SET_FIGHTERS_PATH, () => new command_1.SetFightersPathCommand(), false);
    container.register(app_const_1.default.CREATE_BATTLEFIELD, () => new command_1.CreateBattleFieldCommand(), false);
    container.register(app_const_1.default.SPAWN_NEW_FIGHTERS, () => new command_1.SpawnNewFightersCommand(), false);
    container.register(app_const_1.default.SEARCH_FOR_ENNEMIES, () => new command_1.SearchForEnnemiesCommand(), false);
    // models
    container.register(app_const_1.default.GAME_STORE_MODEL, () => new coffe_maker_1.StoreModel(), true);
    // repositories
    container.register(app_const_1.default.BATTLEFIELD_REPOSITORY, () => new BattleFieldRepository_1.default(container.resolve(app_const_1.default.GAME_STORE_MODEL), "battlefields"), true);
    // services
    container.register(app_const_1.default.FIGHTER_FACTORY, () => new FighterFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE)), true);
    container.register(app_const_1.default.UID_SERVICE, () => new UIDService_1.default(), true);
    container.register(app_const_1.default.PATH_SERVICE, () => new PathService_1.default(), true);
    // complex services
    container.register(app_const_1.default.SPAWNER_FACTORY, () => new SpawnerFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE), container.resolve(app_const_1.default.FIGHTER_FACTORY)), true);
    container.register(app_const_1.default.BATTLEFIELD_FACTORY, () => new BattleFieldFactory_1.default(container.resolve(app_const_1.default.UID_SERVICE), container.resolve(app_const_1.default.SPAWNER_FACTORY), container.resolve(app_const_1.default.FIGHTER_FACTORY)), true);
    return container;
}
exports.configIOC = configIOC;
function configFacade(container) {
    const facade = container.resolve(app_const_1.default.APP_FACADE);
    // commands
    facade.registerCommand(app_const_1.default.DO_CYCLE, container.get(app_const_1.default.DO_CYCLE));
    facade.registerCommand(app_const_1.default.GAME_OVER, container.get(app_const_1.default.GAME_OVER));
    facade.registerCommand(app_const_1.default.FIGHT, container.get(app_const_1.default.FIGHT));
    facade.registerCommand(app_const_1.default.REMOVE_DEAD_FIGHTERS, container.get(app_const_1.default.REMOVE_DEAD_FIGHTERS));
    facade.registerCommand(app_const_1.default.MOVE_FIGHTERS, container.get(app_const_1.default.MOVE_FIGHTERS));
    facade.registerCommand(app_const_1.default.SET_FIGHTERS_PATH, container.get(app_const_1.default.SET_FIGHTERS_PATH));
    facade.registerCommand(app_const_1.default.CREATE_BATTLEFIELD, container.get(app_const_1.default.CREATE_BATTLEFIELD));
    facade.registerCommand(app_const_1.default.SPAWN_NEW_FIGHTERS, container.get(app_const_1.default.SPAWN_NEW_FIGHTERS));
    facade.registerCommand(app_const_1.default.SEARCH_FOR_ENNEMIES, container.get(app_const_1.default.SEARCH_FOR_ENNEMIES));
    facade.registerCommand(app_const_1.default.REMOVE_WINNERS, container.get(app_const_1.default.REMOVE_WINNERS));
    //repositories
    facade.registerProxy(app_const_1.default.BATTLEFIELD_REPOSITORY, container.resolve(app_const_1.default.BATTLEFIELD_REPOSITORY));
    // services
    facade.registerService(app_const_1.default.PATH_SERVICE, container.resolve(app_const_1.default.PATH_SERVICE));
    facade.registerService(app_const_1.default.UID_SERVICE, container.resolve(app_const_1.default.UID_SERVICE));
    facade.registerService(app_const_1.default.SERIALIZER_SERVICE, container.resolve(app_const_1.default.SERIALIZER_SERVICE));
    facade.registerService(app_const_1.default.FIGHTER_FACTORY, container.resolve(app_const_1.default.FIGHTER_FACTORY));
    facade.registerService(app_const_1.default.SPAWNER_FACTORY, container.resolve(app_const_1.default.SPAWNER_FACTORY));
    facade.registerService(app_const_1.default.BATTLEFIELD_FACTORY, container.resolve(app_const_1.default.BATTLEFIELD_FACTORY));
    return facade;
}
exports.configFacade = configFacade;
