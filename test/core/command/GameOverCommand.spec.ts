import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD1 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";
import Fighter from "../../../lib/core/model/schema/Fighter";
import { GameOverInfoType } from "../../../lib/core/model/types/GameOverInfoType";


describe('GameOverCommand test suite', 
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
        }
    );


    it(' no game over : (1+ attacker)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', data.id);
        
        // when 
        const info:GameOverInfoType = await facade.query(AppConst.GAME_OVER, {id:data.id});
        
        // // then 
        expect(info).toBeTruthy();
        expect(info.gameover).toBeFalse();
        expect(info.attackerWins).toBeFalse();
        expect(info.defenderWins).toBeFalse();
        expect(info.defenders.length).toEqual(bf.defenders.length);
        expect(info.attackers.length).toEqual(bf.attackers.length);
        expect(info.isDoorDead).toBe(bf.door.hp == 0);
    });

    it(' no game over : (0 attacker) (1+ incoming atk)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', data.id);
        
        // when 
        bf.attackers = []; // 0 attackers
        // 1+ incoming attackers
        const info:GameOverInfoType = await facade.query(AppConst.GAME_OVER, {id:data.id});
        
        // // then 
        expect(info).toBeTruthy();
        expect(info.gameover).toBeFalse();
        expect(info.attackerWins).toBeFalse();
        expect(info.defenderWins).toBeFalse();
        expect(info.defenders.length).toEqual(bf.defenders.length);
        expect(info.attackers.length).toEqual(bf.attackers.length);
        expect(info.isDoorDead).toBe(bf.door.hp == 0);
    });

    it('defender loses :  (0 attackers) (0 incoming atk)  (1+ winner)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const winRepo:IRepository<Fighter> = facade.getProxy(AppConst.WINNERS_REPOSITORY) as IRepository<Fighter>;
        const bf = repository.getOneBy('id', data.id);
        
        // when 
        bf.attackers = []; // 0 attackers
        bf.atkSpawners.forEach(s=>s.fighters = []); // 0 incoming attackers
        winRepo.add(bf.attackers[0]);
        const info:GameOverInfoType = await facade.query(AppConst.GAME_OVER, {id:data.id});
        
        // // then 
        expect(info).toBeTruthy();
        expect(info.gameover).toBeTrue();
        expect(info.attackerWins).toBeTrue();
    });

    it('defender wins : (0 attackers) (0 incoming atk) (0 winner)', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const winRepo:IRepository<Fighter> = facade.getProxy(AppConst.WINNERS_REPOSITORY) as IRepository<Fighter>;
        const bf = repository.getOneBy('id', data.id);
        
        // when 
        bf.door.hp = 0;
        bf.attackers = []; // 0 attackers
        bf.atkSpawners.forEach(s=>s.fighters = []); // 0 incoming attackers
        const info:GameOverInfoType = await facade.query(AppConst.GAME_OVER, {id:data.id});
        
        // // then 
        expect(info).toBeTruthy();
        expect(info.gameover).toBeTrue();
        expect(info.attackerWins).toBeFalse();
        expect(info.defenderWins).toBeTrue();
        expect(info.attackers.length).toEqual(0);
        expect(info.winners.length).toEqual(0);
    });
})