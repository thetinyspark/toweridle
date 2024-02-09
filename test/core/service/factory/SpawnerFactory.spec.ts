import { Facade } from "@thetinyspark/coffe-maker";
import AppConst from "../../../../lib/core/ioc/app.const";
import * as mock from "../../../mock.spec";
import { setup } from "../../../setup.spec";
import IFactory from "../../../../lib/core/service/factory/IFactory";
import Spawner from "../../../../lib/core/model/schema/Spawner";

describe('SpawnerFactory test suite', 
()=>{
    it('should be able to create a spawner from data', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.SPAWNER_FACTORY) as IFactory;
        const tpl = mock.SPAWNER1();

        // expected fighters 
        const numFighters = tpl.fighters.reduceRight( 
            (previous, current)=>{ return previous + current.amount }, 
            0 
        );

        // when 
        const result = factory.fromData(tpl) as Spawner;

        // then 

        expect(result.id).toEqual(tpl.id);
        expect(result.ownerID).toEqual(tpl.ownerID);
        expect(result.name).toEqual(tpl.name);
        expect(result.row).toEqual(tpl.row);
        expect(result.col).toEqual(tpl.col);
        expect(result.frequency).toEqual(tpl.frequency);
        expect(result.fighters.length).toEqual(numFighters);

        result.fighters.forEach( 
            (fighter)=>{
                expect(fighter.row).toEqual(tpl.row);
                expect(fighter.col).toEqual(tpl.col);
            }
        );
    }); 

    it('should provide a unique building id if it is not provided or it has a negative value', 
    ()=>{
        // given 
        const facade = setup() as Facade;
        const factory = facade.getService(AppConst.SPAWNER_FACTORY) as IFactory;

        // when 
        const desc = mock.SPAWNER1();
        const result1 = factory.fromData({...desc, id:-1}) as Spawner;
        const result2 = factory.fromData(desc) as Spawner;
        const result3 = factory.fromData({...desc, id:4}) as Spawner;
        const result4 = factory.fromData(desc) as Spawner;

        // then 
        expect(result1.id).toEqual(1);
        expect(result2.id).toEqual(2);
        expect(result3.id).toEqual(4);
        expect(result4.id).toEqual(5);
    });
})