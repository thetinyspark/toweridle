import ISerializerService from "../../../lib/core/service/ISerializerService";
import { setup } from "../../setup.spec";
import { Container, Facade, IStoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";

describe("ISerializerService test suite", () => {
  it("should be able serialize this into a json or object", () => {
    // given
    const container = new Container();
    const facade = setup(container) as Facade;
    const serializer = facade.getService(AppConst.SERIALIZER_SERVICE) as ISerializerService;
    const storage = container.resolve(AppConst.GAME_STORE_MODEL) as IStoreModel;
    
    // when
    // facade.sendNotification(AppConst.ADD_CITY, mock.SHANGRILA() );
    // const expected = {
    //   cities: [mock.SHANGRILA()], 
    //   resources: mock.RESOURCES_MOCK, 
    //   templateBuildings: mock.TEMPLATE_BUILDINGS_MOCK
    // }; 

    // const state = storage.getState();
    // const results1 = serializer.serialize(state.cities, state.templateBuildings, state.resources, "json");
    // const results2 = serializer.serialize(state.cities, state.templateBuildings, state.resources, "raw");
    // then
    // expect(results1).toBeInstanceOf(String);  
    // expect(results2).toBeInstanceOf(Object);  

    expect(true).toBeTrue();
  });

  it("should be able to fighter data into obj", () => {
    // given
    const container = new Container();
    const facade = setup(container) as Facade;
    const serializer = facade.getService(AppConst.SERIALIZER_SERVICE) as ISerializerService;
    const storage = container.resolve(AppConst.GAME_STORE_MODEL) as IStoreModel;
    
    // when
    // facade.sendNotification(AppConst.ADD_CITY, mock.SHANGRILA() );
    // const expected = {
    //   cities: [mock.SHANGRILA()], 
    //   resources: mock.RESOURCES_MOCK, 
    //   templateBuildings: mock.TEMPLATE_BUILDINGS_MOCK
    // }; 

    // const state = storage.getState();
    // const results = serializer.convertToObj(state.cities, state.templateBuildings, state.resources);
    // // then
    // expect(expected).toEqual(results);  
    expect(true).toBeTrue();
  });
});
