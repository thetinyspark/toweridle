import { setupEngine } from "../setup.spec";
import Engine from "../../lib/core/Engine";
import { BATTLEFIELD1 } from "../mock.spec";

describe("Engine test suite", () => {
    var engine:Engine;
    

    beforeEach(
        ()=>{
            engine = setupEngine();
        }
    );

    // battlefield
    it("should be able to create a battlefield and returns it", 
        async () => {
            // given
            engine.reset();

            //when
            const bf = await engine.createBattleField(BATTLEFIELD1());
            // then
            expect(bf).toBeTruthy();
        }   
    );

    it("should be able to get all battlefields", 
        async () => {
            // given
            engine.reset();
            const bf = await engine.createBattleField(BATTLEFIELD1());
            const bf2 = await engine.createBattleField(BATTLEFIELD1());
            
            //when
            const bfs = engine.getBattleFields();

            // then
            expect(bfs).toContain(bf);
            expect(bfs).toContain(bf2);
        }   
    );

    it("should be able to get a battlefield by its id", 
        async () => {
            // given
            engine.reset();
            const bf = await engine.createBattleField(BATTLEFIELD1());
            const bf2 = await engine.createBattleField(BATTLEFIELD1());
            
            //when
            const bf3 = engine.getBattleFieldByID(bf2.id);

            // then
            expect(bf3).toBe(bf2);
        }   
    );

    // cycle
    it("should be able to process a cycle", 
        async () => {
            // given
            engine.reset();
            const bf = await engine.createBattleField(BATTLEFIELD1());

            // when
            const ok = await engine.doCycle(bf.id, 1);
            expect(bf).toBeTruthy();
            expect(ok).toBeTruthy();
        }   
    );

    it("should be able to process a cycle until game over", 
        async () => {
            // given
            engine.reset();
            const bf = await engine.createBattleField(BATTLEFIELD1());

            // when
            const ok = await engine.doCycle(bf.id, 1, true);
            expect(bf).toBeTruthy();
            expect(ok).toBeTruthy();
            expect(ok.gameover).toBeTrue();
        }   
    );

    
    // version
    it("should be able return version and facade", 
        async () => {
            expect(engine.getVersion()).not.toBeNull();
            expect(engine.getFacade()).not.toBeNull();
        }   
    );
});
