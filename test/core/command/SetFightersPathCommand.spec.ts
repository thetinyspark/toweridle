import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";


describe('SetFightersPathCommand test suite', 
()=>{

    it('should be able to set all fighters paths', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        // when 
        const ok1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const ok2 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
        const ok3 = await facade.query(AppConst.SET_FIGHTERS_PATH, {id: data.id});
        const bf = repository.getOneBy('id', 1);
        const nopathAtk = bf.attackers.filter(f=>f.path.length == 0);
        const nopathDef = bf.defenders.filter(f=>f.path.length == 0);
        
        // // then 
        expect(ok1).toBeTruthy();
        expect(ok2).toBeTrue();
        expect(ok3).toBeTrue();
        expect(nopathAtk.length).toEqual(0);
        // door does not have a path
        expect(nopathDef.length).toEqual(1); 
        expect(nopathDef[0]).toBe(bf.door);
    });

    it('should be able to set paths when there is no more ennemies and strategy mode is TO_THE_DOOR', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        
        // when 
        const ok1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const ok2 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
        
        // kill all defenders
        const bf = repository.getOneBy('id', 1);
        bf.defenders = [];
        const ok3 = await facade.query(AppConst.SET_FIGHTERS_PATH, {id: data.id});

        
        const nopathAtk = bf.attackers.filter(f=>f.path.length == 0);
        
        // // then 
        expect(ok1).toBeTruthy();
        expect(ok2).toBeTrue();
        expect(ok3).toBeTrue();
        expect(nopathAtk.length).toEqual(0);
    });

    it('should not be able to set all fighters paths if battlefield does not exists', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        // when 
        const ok1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const ok2 = await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
        const ok3 = await facade.query(AppConst.SET_FIGHTERS_PATH, {id: 10}); // bad id
        const bf = repository.getOneBy('id', 1);
        const nopathAtk = bf.attackers.filter(f=>f.path.length == 0);
        const nopathDef = bf.defenders.filter(f=>f.path.length == 0);
        
        // // then 
        expect(ok1).toBeTruthy();
        expect(ok2).toBeTrue();
        expect(ok3).toBeFalse();
        expect(nopathAtk.length).not.toEqual(0);
        expect(nopathDef.length).not.toEqual(0); 
    });
})