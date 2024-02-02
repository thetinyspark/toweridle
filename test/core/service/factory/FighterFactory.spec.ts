import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import Fighter from "../../../../lib/core/model/schema/city/Fighter";

describe('FighterFactory test suite', 
()=>{
    it('should be able to create a fighter from data according to its template', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.FIGHTER_FACTORY) as IFactory;

        // when 
        const tpl = mock.ARCHER_LVL1_DESC();
        const result = factory.fromData(tpl) as Fighter;

        // then 
        expect(result).not.toBeNull();
        expect(result.id).toEqual(tpl.id);
        expect(result.name).toEqual(tpl.name);
        expect(result.phyAtk).toEqual(tpl.phyAtk);
        expect(result.phyDef).toEqual(tpl.phyDef);
        expect(result.hp).toEqual(tpl.hp);
        expect(result.magAtk).toEqual(tpl.magAtk);
        expect(result.magDef).toEqual(tpl.magDef);
        expect(result.range).toEqual(tpl.range);
        expect(result.speed).toEqual(tpl.speed);
        expect(result.tplID).toEqual(tpl.id);
    }); 

    it('should provide a unique building id if it is not provided or it has a negative value', 
    ()=>{
        // given 
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.FIGHTER_FACTORY) as IFactory;

        // when 
        const desc = mock.ARCHER_LVL1_DESC();
        const result1 = factory.fromData({...desc, id:-1}) as Fighter;
        const result2 = factory.fromData(desc) as Fighter;
        const result3 = factory.fromData({...desc, id:4}) as Fighter;
        const result4 = factory.fromData(desc) as Fighter;

        // then 
        expect(result1.id).toEqual(1);
        expect(result2.id).toEqual(2);
        expect(result3.id).toEqual(3);
        expect(result4.id).toEqual(4);
        expect(result1.tplID).toEqual(desc.tplID);
        expect(result2.tplID).toEqual(desc.tplID);
        expect(result3.tplID).toEqual(desc.tplID);
        expect(result4.tplID).toEqual(desc.tplID);
    });
})