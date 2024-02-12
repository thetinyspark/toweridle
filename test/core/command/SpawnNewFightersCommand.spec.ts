import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1, BATTLEFIELD2, BATTLEFIELD3 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";


describe('SpawnNewFightersCommand test suite', 
()=>{

    const facade = setup() as Facade;
    const data1 = BATTLEFIELD1();
    const data2 = BATTLEFIELD2();
    const data3 = BATTLEFIELD3();

    beforeEach( 
        async ()=>{
            const bfrepo:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
            bfrepo.reset();
            await facade.query(AppConst.CREATE_BATTLEFIELD, data1);
            await facade.query(AppConst.CREATE_BATTLEFIELD, data2);
            await facade.query(AppConst.CREATE_BATTLEFIELD, data3);
        }
    )

    it('should be able to spawn new fighters according to spawners configurations', 
    async ()=>{
        // given 
        const bfrepo:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf1 = bfrepo.getOneBy('id',data1.id);
        const bf2 = bfrepo.getOneBy('id',data2.id);
        const bf3 = bfrepo.getOneBy('id',data3.id);

        // when 

        const ok1 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data1.id, numCycle:2});
        const ok2 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data2.id, numCycle:2});
        const ok3 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data3.id, numCycle:2});

        
        // then 
        expect(ok1).toBeTrue();
        expect(ok2).toBeTrue();
        expect(ok3).toBeTrue();

        // NOTE: The door is automatically added to defenders at initialization
        
        expect(bf1.attackers.length).toEqual(1);
        expect(bf1.defenders.length).toEqual(2); 

        expect(bf2.attackers.length).toEqual(2);
        expect(bf2.defenders.length).toEqual(4); 

        expect(bf3.attackers.length).toEqual(1);
        expect(bf3.defenders.length).toEqual(1);
    });
})