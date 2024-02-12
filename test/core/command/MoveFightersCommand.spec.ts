import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Fighter from "../../../lib/core/model/schema/Fighter";


describe('MoveFightersCommand test suite', 
()=>{

    var facade = setup() as Facade;
    var data   = BATTLEFIELD1();

    function getInfos(fighter:Fighter){
        return {row: fighter.row, col: fighter.col, pathLength: fighter.path?.length || 0};
    }

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
        }
    );


    it('should be able to move all fighters according to their path', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', 1);
        const fighter1 = bf.attackers[0];
        const fighter2 = bf.door;
        const fighter3 = bf.defenders[1];

        // when 
        const before1 = getInfos(fighter1);
        const before2 = getInfos(fighter2);
        const before3 = getInfos(fighter3);
        const ok = await facade.query(AppConst.MOVE_FIGHTERS, {id: data.id});
        
        // then 
        expect(before1).not.toEqual(getInfos(fighter1));
        expect(before3).not.toEqual(getInfos(fighter3));
        expect(getInfos(fighter1).pathLength).toEqual(before1.pathLength - fighter1.speed);
        expect(before3.pathLength).not.toEqual(getInfos(fighter3).pathLength);
        
        // door can't move
        expect(before2.pathLength).toEqual(getInfos(fighter2).pathLength);
        expect(before2).toEqual(getInfos(fighter2));
    });

    it('should not move a fighter it it has an enemy', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', 1);
        const fighter1 = bf.attackers[0];
        const fighter2 = bf.defenders[1];

        // force fighter1 to have en enemy
        fighter1.enemy = fighter2;

        // when 
        const before1 = getInfos(fighter1);
        const before2 = getInfos(fighter2);
        const ok = await facade.query(AppConst.MOVE_FIGHTERS, {id: data.id});
        
        // then 
        expect(ok).toBeTrue();
        expect(before1).toEqual(getInfos(fighter1));
        expect(getInfos(fighter1).pathLength).toEqual(before1.pathLength);
        
        expect(before2).not.toEqual(getInfos(fighter2));
        expect(before2.pathLength).not.toEqual(getInfos(fighter2).pathLength);
    });
})