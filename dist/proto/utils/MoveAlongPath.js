"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoveAlongPath {
    _steps = [];
    _target;
    calc(target, path, numFrames = 30) {
        console.log(path.length);
        this._target = target;
        this._steps = [];
        const numSteps = path.length - 1;
        const numFramesPerStep = numFrames / numSteps;
        for (let i = 0; i < numSteps; i++) {
            const next = path[i + 1];
            this._steps.push(...this._interpolate(path[i], next, numFramesPerStep));
        }
    }
    _interpolate(from, to, numSteps) {
        const results = [];
        const distX = to.x - from.x;
        const distY = to.y - from.y;
        const stepX = distX / numSteps;
        const stepY = distY / numSteps;
        for (let i = 0; i < numSteps; i++) {
            results.push({
                x: from.x + (i * stepX),
                y: from.y + (i * stepY),
            });
        }
        return results;
    }
    nextFrame() {
        const next = this._steps.shift();
        if (!next)
            return;
        this._target.x = next.x;
        this._target.y = next.y;
    }
}
exports.default = MoveAlongPath;
