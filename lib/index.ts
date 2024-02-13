import { Container } from "@thetinyspark/coffe-maker";
import Engine from "./core/Engine";
import AppConst from "./core/ioc/app.const";

const engine = new Engine();
const defaultContainer = new Container();
engine.init(defaultContainer);

export = {
    enginetowerIdleEngine: engine, 
    consts: AppConst
};