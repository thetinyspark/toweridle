import { DisplayObject, Point } from "@thetinyspark/moocaccino-barista";
export default class MoveAlongPath {
    private _steps;
    private _target;
    calc(target: DisplayObject, path: Point[], numFrames?: number): void;
    private _interpolate;
    nextFrame(): void;
}
