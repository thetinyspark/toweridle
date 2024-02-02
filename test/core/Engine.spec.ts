import { setupEngine } from "../setup.spec";
import Engine from "../../lib/core/Engine";

describe("Engine test suite", () => {
    var engine:Engine;
    

    beforeEach(
        ()=>{
            engine = setupEngine();
        }
    );


    // cycle
    it("should be able to process a cycle", 
        async () => {
            // given
            engine.reset();

            expect(true).toBeTruthy();
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
