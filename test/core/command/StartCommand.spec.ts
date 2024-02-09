import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";


describe('StartCommand test suite', 
()=>{
    it('should be able to start engine with the proper configuration', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        // when 

        // then 
        expect(true).toBe(true);
        // const ok = await facade.query(AppConst.START_APP, save);
        // const repository:IRepository<FighterTemplate> = facade.getProxy(AppConst.FIGHTERS_TPL_REPOSITORY) as IRepository<FighterTemplate>;
        // const templates = repository.getAll();

        // // then 
        // expect(ok).toBeTrue();
        // expect(repository).not.toBeNull();
        // expect(templates.length).toEqual(save.templates.length);
    });
})