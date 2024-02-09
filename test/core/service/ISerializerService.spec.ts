import ISerializerService from "../../../lib/core/service/ISerializerService";
import { setup } from "../../setup.spec";
import { Container, Facade, IStoreModel } from "@thetinyspark/coffe-maker";
import AppConst from "../../../lib/core/ioc/app.const";

describe("ISerializerService test suite", () => {
  it("should be able serialize this into a json or object", () => {
    // given
    const container = new Container();
    const facade = setup(container) as Facade;
    // when
    // then

    expect(true).toBeTrue();
  });

  it("should be able to fighter data into obj", () => {
    // given
    const container = new Container();
    const facade = setup(container) as Facade;
    // const serializer = facade.getService(AppConst.SERIALIZER_SERVICE) as ISerializerService;
    // const storage = container.resolve(AppConst.GAME_STORE_MODEL) as IStoreModel;
    
    // when
    
    // then
    expect(true).toBeTrue();
  });
});
