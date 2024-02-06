import { DisplayObject, DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
export default class Lifebar extends DisplayObjectContainer {
    maxHP: number;
    currentHP: number;
    constructor();
    init(foreground: DisplayObject, background: DisplayObject, maxHP: number): void;
    refresh(hp: number): void;
}
