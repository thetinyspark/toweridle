import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Fighter from "../../../lib/core/model/schema/Fighter";


describe('RemoveWinnersCommand test suite', 
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


    it('should be able to remove all attackers beyond door (if the door is dead)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const winRepo:IRepository<Fighter> = facade.getProxy(AppConst.WINNERS_REPOSITORY) as IRepository<Fighter>;
        const bf = repository.getOneBy('id', data.id);
        const fighter1 = bf.attackers[0];
        const before = bf.attackers.length;

        // when 
        // force door dead && fighters localization
        bf.door.hp = 0;
        bf.defenders.splice( bf.defenders.indexOf(bf.door), 1);
        fighter1.row = bf.door.row;
        fighter1.col = bf.door.col;
        const ok = await facade.query(AppConst.REMOVE_WINNERS, {id:data.id});
        
        // // then 
        expect(ok).toBeTrue();
        expect(bf.attackers.length).toEqual(before-1);
        expect(winRepo.getAll().length).toEqual(1);
    });

    it('should not be able to remove all attackers beyond door (if the door is not dead)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const winRepo:IRepository<Fighter> = facade.getProxy(AppConst.WINNERS_REPOSITORY) as IRepository<Fighter>;
        const bf = repository.getOneBy('id', data.id);
        const fighter1 = bf.attackers[0];
        const before = bf.attackers.length;

        // when 
        fighter1.row = bf.door.row;
        fighter1.col = bf.door.col;
        const ok = await facade.query(AppConst.REMOVE_WINNERS, {id:data.id});
        
        // // then 
        expect(ok).toBeTrue();
        expect(bf.attackers.length).toEqual(before);
        expect(winRepo.getAll().length).toEqual(0);
    });
})