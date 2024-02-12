import { setup } from "../../setup.spec";
import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";
import PathService from "../../../lib/core/service/PathService";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import Repository from "../../../lib/core/model/repository/Repository";
import PathStrategyMode from "../../../lib/core/model/enum/PathStrategyMode";
import Fighter from "../../../lib/core/model/schema/Fighter";

describe("PathService test suite", () => {

  function getCoords(fighter:Fighter){
    return {row: fighter.row, col: fighter.col};
  }

  it("should be able to get the service", () => {
    // given
    const facade = setup() as Facade;
    const service = facade.getService(AppConst.PATH_SERVICE) as PathService;
    expect(service).toBeTruthy();
  });

  it("should be able get a path for a fighter according to a specific strategy", async () => {
    // given
    const facade = setup() as Facade;
    const data = BATTLEFIELD1();
    const service = facade.getService(AppConst.PATH_SERVICE) as PathService;
    const repo = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as Repository<BattleField>;

    
    // when 
    await facade.query(AppConst.CREATE_BATTLEFIELD, data);
    await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
    await facade.query(AppConst.SEARCH_FOR_ENNEMIES, {id: data.id});
    
    const battlefield = repo.getOneBy('id',1) as BattleField;
    const fighter = battlefield.attackers[0];
    const enemy = battlefield.defenders[1];
    const pathToDoor = service.findPath(fighter, battlefield, PathStrategyMode.TO_THE_DOOR );
    const pathToEnemy = service.findPath(fighter, battlefield, PathStrategyMode.TO_THE_CLOSEST_ENEMY );

    // then
    expect(pathToEnemy).toBeTruthy();
    expect(pathToEnemy[pathToEnemy.length-1]).toBeTruthy();
    expect(pathToEnemy[pathToEnemy.length-1].state.row).toEqual(enemy.row);
    expect(pathToEnemy[pathToEnemy.length-1].state.col).toEqual(enemy.col);

    expect(pathToDoor).toBeTruthy();
    expect(pathToDoor[pathToDoor.length-1]).toBeTruthy();
    expect(pathToDoor[pathToDoor.length-1].state.row).toEqual(battlefield.door.row);
    expect(pathToDoor[pathToDoor.length-1].state.col).toEqual(battlefield.door.col);

    // path does not contain the current fighter node

    expect(pathToDoor[0].state.row === fighter.row && pathToDoor[0].state.col === fighter.col).toBeFalse();
    expect(pathToEnemy[0].state.row === fighter.row && pathToEnemy[0].state.col === fighter.col).toBeFalse();

  });
});
