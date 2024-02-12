import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";


describe('SearchForEnnemiesCommand test suite', 
()=>{

    const facade = setup() as Facade;
    const data1 = BATTLEFIELD1();

    beforeEach( 
        async ()=>{
            const bfrepo:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
            bfrepo.reset();
            await facade.query(AppConst.CREATE_BATTLEFIELD, data1);
            await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id:data1.id, numCycle:2});
        }
    )

    it('should be able to find an enemy for each fighter inside its radius', 
    async ()=>{
        // given 
        const bfrepo:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf1 = bfrepo.getOneBy('id',data1.id);
        const numRows = data1.grid.length;
        const numCols = data1.grid[0].length;
        const maxRadius = numRows * numCols;
        bf1.attackers[0].radius = maxRadius;
        bf1.defenders[0].radius = maxRadius;
        bf1.defenders[1].row = bf1.attackers[0].row - bf1.defenders[1].radius;
        bf1.defenders[1].col = bf1.attackers[0].col - bf1.defenders[1].radius;

        // when 

        const ok1 = await facade.query(AppConst.SEARCH_FOR_ENNEMIES, {id:data1.id});

        
        // then 
        expect(bf1.attackers[0].enemy).not.toBeNull();
        expect(bf1.defenders[0].enemy).not.toBeNull();
        expect(bf1.defenders[1].enemy).not.toBeNull();
        expect(ok1).toBeTrue();
    });
})