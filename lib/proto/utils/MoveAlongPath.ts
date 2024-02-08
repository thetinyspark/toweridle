import { DisplayObject, Point } from "@thetinyspark/moocaccino-barista";

export default class MoveAlongPath{

    private _steps:Point[] = [];
    private _target:DisplayObject;

    public calc( target:DisplayObject, path:Point[], numFrames:number = 30 ):void{

        console.log(path.length)
        this._target = target;
        this._steps = [];
        const numSteps = path.length - 1; 
        const numFramesPerStep = numFrames / numSteps; 
        for( let i = 0; i < numSteps; i++ ){
            const next = path[i+1]; 
            this._steps.push( ...this._interpolate(path[i], next, numFramesPerStep));
        }
    }

    private _interpolate(from:Point, to:Point, numSteps:number):Point[]{
        const results = []; 
        const distX = to.x - from.x; 
        const distY = to.y - from.y; 
        const stepX = distX / numSteps;
        const stepY = distY / numSteps;
        for( let i = 0; i < numSteps; i++ ){
            results.push(
                {
                    x: from.x + (i*stepX),
                    y: from.y + (i*stepY),
                }
            )
        }
        return results;
    }

    public nextFrame():void{
        const next = this._steps.shift();
        if( !next)
            return; 

        this._target.x = next.x;
        this._target.y = next.y;
    }
}