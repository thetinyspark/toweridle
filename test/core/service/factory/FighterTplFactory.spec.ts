import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import FighterTemplate from "../../../../lib/core/model/schema/city/FighterTemplate";

describe('FighterTplFactory test suite', 
()=>{
    it('should be able to create a fighter from data according to its template', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.FIGHTER_TPL_FACTORY) as IFactory;

        // when 
        const tpl = mock.ARCHER_LVL1_TPL_DESC();
        const result = factory.fromData(tpl) as FighterTemplate;

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
    }); 

    it('should provide a unique building id if it is not provided or it has a negative value', 
    ()=>{
        // given 
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.FIGHTER_FACTORY) as IFactory;

        // when 
        const tpl = mock.ARCHER_LVL1_TPL_DESC();
        const result1 = factory.fromData({...tpl, id:-1}) as FighterTemplate;
        const result2 = factory.fromData(tpl) as FighterTemplate;
        const result3 = factory.fromData({...tpl, id:4}) as FighterTemplate;
        const result4 = factory.fromData(tpl) as FighterTemplate;

        // then 
        expect(result1.id).toEqual(1);
        expect(result2.id).toEqual(2);
        expect(result3.id).toEqual(3);
        expect(result4.id).toEqual(4);
    });
})