import { Facade } from "@thetinyspark/coffe-maker";
import { setup } from "../../setup.spec";
import AppConst from "../../../lib/core/ioc/app.const";
import * as mock from "../../mock.spec";
import IRepository from "../../../lib/core/model/repository/IRepository";
import FighterTemplate from "../../../lib/core/model/schema/FighterTemplate";


describe('StartCommand test suite', 
()=>{
    it('should be able to start engine with the proper configuration', 
    async ()=>{
        // given 
        const facade        = setup() as Facade;
        const save          = mock.GAME_SAVE_DESC();
        // when 

        const ok = await facade.query(AppConst.START_APP, save);
        const repository:IRepository<FighterTemplate> = facade.getProxy(AppConst.FIGHTERS_TPL_REPOSITORY) as IRepository<FighterTemplate>;
        const templates = repository.getAll();

        // then 
        expect(ok).toBeTrue();
        expect(repository).not.toBeNull();
        expect(templates.length).toEqual(save.templates.length);
    });
})