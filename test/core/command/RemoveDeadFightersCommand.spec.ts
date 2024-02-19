import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Fighter from "../../../lib/core/model/schema/Fighter";


describe('RemoveDeadFightersCommand test suite', 
()=>{

    var facade = setup() as Facade;
    var data   = BATTLEFIELD1();

    beforeEach( 
        async ()=>{
            facade = setup() as Facade;
            data   = BATTLEFIELD1();
            const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
            repository.reset();
            await facade.query(AppConst.CREATE_BATTLEFIELD, data);
            await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
            await facade.query(AppConst.SEARCH_FOR_ENNEMIES, {id: data.id});
            await facade.query(AppConst.SET_FIGHTERS_PATH, {id: data.id});
            await facade.query(AppConst.MOVE_FIGHTERS, {id: data.id});
            await facade.query(AppConst.FIGHT, {id: data.id});
        }
    );


    it('should be able to remove all dead fighters from the battlefield', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', data.id);
        const before = bf.attackers.length + bf.defenders.length;
        const fighter1 = bf.attackers[0];
        const fighter2 = bf.defenders[1];

            // force hp 
        fighter1.hp = 0;
        fighter2.hp = 10 - Math.round( Math.random() * 20 );
        const expected = fighter2.hp <= 0 ? before - 2 : before - 1;

        // when 
        const ok = await facade.query(AppConst.REMOVE_DEAD_FIGHTERS, {id:data.id});
        const after = bf.attackers.length + bf.defenders.length;
        
        // // then 
        expect(ok).toBeTrue();
        expect(after).toEqual(expected);
    });

    it('should be able to get all dead attackers and defenders from repository', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', data.id);
        const fighter1 = bf.attackers[0];
        const fighter2 = bf.defenders[1];

            // force hp 
        fighter1.hp = 0;
        fighter2.hp = 0;

        // when 
        const ok = await facade.query(AppConst.REMOVE_DEAD_FIGHTERS, {id:data.id});
        
        // // then 
        expect(bf.deadDefenders.length).toEqual(1);
        expect(bf.deadDefenders[0]).toEqual(fighter2);
        expect(bf.deadAttackers.length).toEqual(1);
        expect(bf.deadAttackers[0]).toEqual(fighter1);
    });
})