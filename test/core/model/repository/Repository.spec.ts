import { StoreModel } from "@thetinyspark/coffe-maker";
import IRepository from "../../../../lib/core/model/repository/IRepository";
import Repository from "../../../../lib/core/model/repository/Repository";

describe('IRepository test suite', 
()=>{

    class Dummy{
        constructor(
            public id:number = 0,
            public name:string = ""
        ){}
    }
    const repository:IRepository<Dummy> = new Repository<Dummy>(new StoreModel(), "dummies");

    beforeEach( 
        ()=>{
            repository.reset();
        }
    )

    it('should be able to reset a repository for a specific type', 
    ()=>{
        // when 
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(2,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));
        repository.reset();
        
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(2,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));
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
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(2,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));
        const results = repository.getAll();

        // when then
        expect(results.length).toEqual(4);
        expect(results[0].id).toEqual(1);
        expect(results[1].id).toEqual(2);
        expect(results[2].id).toEqual(3);
        expect(results[3].id).toEqual(4);
    }); 

    it('should be able to add elements on a repository and remove one', 
    ()=>{
        // when 
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(2,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));

        repository.remove(repository.getAll()[1]);
        const results = repository.getAll();

        // when then
        expect(results.length).toEqual(3);
        expect(results[0].id).toEqual(1);
        expect(results[1].id).toEqual(3);
        expect(results[2].id).toEqual(4);
    }); 

    it('should be able to add elements on a repository and retrieve those with specific criteria', 
    ()=>{
        // when 
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));
        const results = repository.getAllBy("id",1);

        // when then
        expect(results.length).toEqual(2);
        expect(results[0].id).toEqual(1);
        expect(results[1].id).toEqual(1);
    }); 

    it('should be able to add elements on a repository and retrieve one with specific criteria', 
    ()=>{
        // when 
        repository.add(new Dummy(1,"coucou"));
        repository.add(new Dummy(2,"coucou"));
        repository.add(new Dummy(3,"coucou"));
        repository.add(new Dummy(4,"coucou"));
        const results = repository.getOneBy("id",1);

        // when then
        expect(results.id).toEqual(1);
    }); 
})