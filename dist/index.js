"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("./proto/Main");
window.onload = function () {
    const main = new Main_1.default();
    main.start();
};
