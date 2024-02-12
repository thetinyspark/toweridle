import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import { BATTLEFIELD4 } from "../../mock.spec";
import BattleField from "../../../lib/core/model/schema/BattleField";
import IRepository from "../../../lib/core/model/repository/IRepository";


describe('FightCommand test suite', 
()=>{

    const facade        = setup() as Facade;
    const data          = BATTLEFIELD4();

    beforeEach( 
        async ()=>{
            const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
            repository.reset();
            await facade.query(AppConst.CREATE_BATTLEFIELD, data);
            await facade.query(AppConst.SPAWN_NEW_FIGHTERS, {id: data.id, numCycle:2});
            await facade.query(AppConst.SEARCH_FOR_ENNEMIES, {id: data.id});
            await facade.query(AppConst.SET_FIGHTERS_PATH, {id: data.id});
            await facade.query(AppConst.MOVE_FIGHTERS, {id: data.id});
        }
    );


    it('should be able to proceed a fight between all fighters', 
    async ()=>{
        // given 
        const repository:IRepository<BattleField> = facade.getProxy(AppConst.BATTLEFIELD_REPOSITORY) as IRepository<BattleField>;
        const bf = repository.getOneBy('id', 1);        
        const attacker = bf.attackers[0];
        const defender = bf.defenders[1];
        const atk1Mag = ( attacker.magAtk - defender.magDef ) < 0 ? 0 : ( attacker.magAtk - defender.magDef );
        const atk1Def = ( attacker.phyAtk - defender.phyDef ) < 0 ? 0 : ( attacker.phyAtk - defender.phyDef );
        const totalAtk1 = atk1Mag + atk1Def;

        const atk2Mag = ( defender.magAtk - attacker.magDef ) < 0 ? 0 : ( defender.magAtk - attacker.magDef );
        const atk2Def = ( defender.phyAtk - attacker.phyDef ) < 0 ? 0 : ( defender.phyAtk - attacker.phyDef );
        const totalAtk2 = atk2Mag + atk2Def;


        const expectHP1 = Math.max(0,defender.hp - totalAtk1);
        const expectHP2 = Math.max(0,attacker.hp - totalAtk2);
        
        // when
        const ok = await facade.query(AppConst.FIGHT, {id: data.id});

        // then
        expect(ok).toBeTrue();
        expect(bf).toBeTruthy();
        expect(attacker.enemy).toBe(defender);
        expect(defender.enemy).toBe(attacker);
        expect(attacker.hp).toEqual(expectHP1)
        expect(defender.hp).toEqual(expectHP2)
    });
})