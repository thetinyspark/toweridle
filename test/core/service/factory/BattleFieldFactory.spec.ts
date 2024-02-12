import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import Fighter from "../../../../lib/core/model/schema/Fighter";
import BattleField from "../../../../lib/core/model/schema/BattleField";

describe('BattleFieldFactory test suite', 
()=>{
    it('should be able to create a fighter from data according to its template', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.BATTLEFIELD_FACTORY) as IFactory;

        // // when 
        const tpl = mock.BATTLEFIELD1();
        const result = factory.fromData(tpl) as BattleField;

        // // then 
        expect(result).not.toBeNull();
        expect(result.id).toEqual(tpl.id);
        expect(result.name).toEqual(tpl.name);
        expect(result.targetCol).toEqual(tpl.targetCol);
        expect(result.targetRow).toEqual(tpl.targetRow);
        expect(result.atkSpawners.length).toEqual(tpl.atkSpawners.length);
        expect(result.dfdSpawners.length).toEqual(tpl.dfdSpawners.length);
        expect(result.grid.numRows).toEqual(tpl.grid.length);
        expect(result.grid.numCols).toEqual(tpl.grid[0].length);
        expect(result.attackerID).toEqual(tpl.attackerID);
        expect(result.defenderID).toEqual(tpl.defenderID);
        expect(result.door).not.toBeNull();
        expect(result.door.row).toEqual(tpl.targetRow);
        expect(result.door.col).toEqual(tpl.targetCol);
        expect(result.defenders[0]).toEqual(result.door);
    }); 

    it('should provide a unique building id if it is not provided or it has a negative value', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.FIGHTER_FACTORY) as IFactory;

        // when 
        const desc = mock.BATTLEFIELD1();
        const result1 = factory.fromData({...desc, id:-1}) as Fighter;
        const result2 = factory.fromData(desc) as Fighter;
        const result3 = factory.fromData({...desc, id:4}) as Fighter;
        const result4 = factory.fromData(desc) as Fighter;

        // then 
        expect(result1.id).toEqual(1);
        expect(result2.id).toEqual(2);
        expect(result3.id).toEqual(4);
        expect(result4.id).toEqual(5);
    });
})