import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1, BATTLEFIELD5 } from "../../mock.spec";
import { GameOverInfoType } from "../../../lib/core/model/types/GameOverInfoType";


describe('DoCycleCommand test suite', 
()=>{

    it('should be able to process an entire cycle', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD5();
        // when 
        await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const info1:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:data.id, numCycle: 1});
        
        // // then 
        expect(info1).toBeTruthy();
        expect(info1.gameover).toBeFalse();
    });

    it('should be able to process multiple cycles until gameover', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        // when 
        await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const info1:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:data.id, numCycle: 1, complete:true});
        
        // // then 
        expect(info1).toBeTruthy();
        expect(info1.gameover).toBeTrue();
    });

    it('should be able to have the same result wether it is optimized or not', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();

        // push those variables if you want to stress the test
        data.atkSpawners[0].fighters[0].amount = 10;
        data.dfdSpawners[0].fighters[0].amount = 10;

        // when 
        const complete = true;
        const bf1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const bf2 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);

        const info1:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:bf1.id, numCycle: 1, complete, optimize:false});
        const info2:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:bf2.id, numCycle: 1, complete, optimize:true});
        // // then 
        expect(info1.attackerWins).toEqual(info2.attackerWins);
        expect(info1.defenderWins).toEqual(info2.defenderWins);
        expect(info1.attackers.length).toEqual(info2.attackers.length);
        expect(info1.defenders.length).toEqual(info2.defenders.length);
        expect(info1.winners.length).toEqual(info2.winners.length);
    });
})