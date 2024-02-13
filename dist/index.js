"use strict";
const coffe_maker_1 = require("@thetinyspark/coffe-maker");
const Engine_1 = require("./core/Engine");
const app_const_1 = require("./core/ioc/app.const");
const engine = new Engine_1.default();
const defaultContainer = new coffe_maker_1.Container();
engine.init(defaultContainer);
module.exports = {
    enginetowerIdleEngine: engine,
    consts: app_const_1.default
};
