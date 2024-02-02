import { Container, Facade } from "@thetinyspark/coffe-maker";
import IRepository from "../../../../lib/core/model/repository/IRepository";
import { setup } from "../../../setup.spec";
import AppConst from "../../../../lib/core/ioc/app.const";
import Fighter from "../../../../lib/core/model/schema/city/Fighter";
import { ARCHER_LVL1_TPL_DESC, KNIGHT_LVL1_TPL_DESC, MONK_LVL1_TPL_DESC, WIZARD_LVL1_TPL_DESC, createFighterTemplate } from "../../../mock.spec";
import FighterTemplate from "../../../../lib/core/model/schema/city/FighterTemplate";

describe('IRepository test suite', 
()=>{

    
    var repository:IRepository<FighterTemplate>;

    beforeAll( 
        ()=>{
            const container = new Container();
            const facade:Facade = setup(container);
            repository = container.resolve(AppConst.FIGHTERS_REPOSITORY) as IRepository<Fighter>;
        }
    ); 

    beforeEach( 
        ()=>{
            repository.reset();
        }
    )

    it('should be able to reset a repository for a specific type', 
    ()=>{
        // when 
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.reset();
        
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(KNIGHT_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(WIZARD_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(MONK_LVL1_TPL_DESC()));
        repository.reset();
        const results = repository.getAll();

        // when then
        expect(results).toEqual([]);
    });

    it('should be able to create a repository for a specific type', 
    ()=>{
        // when then
        expect(repository).toBeTruthy();
    }); 

    it('should be able to add elements on a repository and retrieve them all', 
    ()=>{
        // when 
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(KNIGHT_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(WIZARD_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(MONK_LVL1_TPL_DESC()));
        const results = repository.getAll();

        // when then
        expect(results.length).toEqual(4);
        expect(results[0].id).toEqual(ARCHER_LVL1_TPL_DESC().id);
        expect(results[1].id).toEqual(KNIGHT_LVL1_TPL_DESC().id);
        expect(results[2].id).toEqual(WIZARD_LVL1_TPL_DESC().id);
        expect(results[3].id).toEqual(MONK_LVL1_TPL_DESC().id);
    }); 

    it('should be able to add elements on a repository and remove one', 
    ()=>{
        // when 
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(KNIGHT_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(WIZARD_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(MONK_LVL1_TPL_DESC()));

        repository.remove(repository.getAll()[1]);
        const results = repository.getAll();

        // when then
        expect(results.length).toEqual(3);
        expect(results[0].id).toEqual(ARCHER_LVL1_TPL_DESC().id);
        expect(results[1].id).toEqual(WIZARD_LVL1_TPL_DESC().id);
        expect(results[2].id).toEqual(MONK_LVL1_TPL_DESC().id);
    }); 

    it('should be able to add elements on a repository and retrieve those with specific criteria', 
    ()=>{
        // when 
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(KNIGHT_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(WIZARD_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(MONK_LVL1_TPL_DESC()));
        const results = repository.getAllBy("id",ARCHER_LVL1_TPL_DESC().id);

        // when then
        expect(results.length).toEqual(2);
        expect(results[0].id).toEqual(1);
        expect(results[1].id).toEqual(1);
    }); 

    it('should be able to add elements on a repository and retrieve one with specific criteria', 
    ()=>{
        // when 
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(ARCHER_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(KNIGHT_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(WIZARD_LVL1_TPL_DESC()));
        repository.add(createFighterTemplate(MONK_LVL1_TPL_DESC()));
        const results = repository.getOneBy("id",1);

        // when then
        expect(results.id).toEqual(1);
    }); 
})