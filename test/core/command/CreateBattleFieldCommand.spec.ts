import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1, INVALID_BATTLEFIELD } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";


describe('CreateBattleFieldCommand test suite', 
()=>{

    it('should be able to create a battlefield', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        // when 
        const ok = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        
        // // then 
        expect(ok).toBeTruthy();
        expect(repository.getAll().length).toEqual(1);
    });

    it('should be able to create a battlefield with proper informations', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        // when 
        const bf = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const battlefield = repository.getOneBy('id', data.id); 
        
        // // then 
        expect(bf).toBeTruthy();
        expect(bf).toBe(battlefield);
        expect(battlefield).not.toBeNull();
        expect(battlefield.id).toEqual(data.id);
        expect(battlefield.atkSpawners.length).toEqual(data.atkSpawners.length);
        expect(battlefield.dfdSpawners.length).toEqual(data.dfdSpawners.length);
        expect(battlefield.attackerID).toEqual(data.attackerID);
        expect(battlefield.defenderID).toEqual(data.defenderID);
        expect(battlefield.attackers.length).toEqual(0);
        expect(battlefield.defenders.length).toEqual(1);
        expect(battlefield.defenders[0]).toEqual(battlefield.door);
        expect(battlefield.door).not.toBeNull();
        expect(battlefield.name).toEqual(data.name);
        expect(battlefield.targetCol).toEqual(data.targetCol);
        expect(battlefield.targetRow).toEqual(data.targetRow);
    });

    it('should not be able to create a battlefield if there is no path between spawners and target', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = INVALID_BATTLEFIELD();
        // when 
        const bf = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        
        // // then 
        expect(bf).toBeFalse();
    });
})