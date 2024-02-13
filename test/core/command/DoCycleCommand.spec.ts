import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import { GameOverInfoType } from "../../../lib/core/model/types/GameOverInfoType";


describe('DoCycleCommand test suite', 
()=>{

    it('should be able to process an entire cycle', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        // when 
        const ok1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);
        const info1:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:data.id, numCycle: 1});
        
        // // then 
        expect(ok1).toBeTrue();
        expect(info1).toBeTruthy();
        expect(info1.gameover).toBeFalse();
    });

    it('should be able to process multiple cycles until gameover', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const data          = BATTLEFIELD1();
        // when 
        const ok1 = await facade.query(AppConst.CREATE_BATTLEFIELD, data);

        const start = Date.now();
        const info1:GameOverInfoType = await facade.query(AppConst.DO_CYCLE, {id:data.id, numCycle: 1, complete:true});
        const time = Date.now() - start;
        
        // // then 
        expect(time).toBeLessThanOrEqual(1);
        expect(ok1).toBeTrue();
        expect(info1).toBeTruthy();
        expect(info1.gameover).toBeTrue();
    });
})