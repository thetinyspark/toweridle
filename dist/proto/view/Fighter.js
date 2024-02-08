"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
const MoveAlongPath_1 = require("../utils/MoveAlongPath");
class Fighter extends moocaccino_barista_1.DisplayObjectContainer {
    info;
    hp;
    row = 0;
    col = 0;
    targetX = 0;
    targetY = 0;
    _path = [];
    _lifebar = null;
    _currentEnemy = null;
    _nextTargetNode = null;
    _mover = new MoveAlongPath_1.default();
    addLifeBar(lifeBar) {
        this._lifebar = lifeBar;
        this.addChild(lifeBar);
    }
    init(info, row, col, size = 25) {
        this.info = info;
        this.hp = this.info.hp;
        this.row = row;
        this.col = col;
        this.targetX = this.x = col * size;
        this.targetY = this.y = row * size;
        this.targetX = this.x;
        this.targetY = this.y;
    }
    setPath(path) {
        this._path = path;
    }
    getPath() {
        return this._path;
    }
    searchEnemy(enemies) {
        const inRadius = this.getEnemiesAround(enemies);
        const enemy = this.getClosestEnemy(inRadius);
        this._currentEnemy = enemy;
    }
    getCurrentEnemy() {
        return this._currentEnemy;
    }
    fight() {
        const enemy = this._currentEnemy;
        if (enemy == null)
            return;
        let phyDmg = this.info.atkPhy - enemy.info.defPhy;
        let magDmg = this.info.atkMag - enemy.info.defMag;
        phyDmg = phyDmg < 0 ? 0 : phyDmg;
        magDmg = magDmg < 0 ? 0 : magDmg;
        enemy.hp -= (phyDmg + magDmg);
        enemy.hp = enemy.hp < 0 ? 0 : enemy.hp;
        enemy.hp = enemy.hp > enemy.info.hp ? enemy.info.hp : enemy.hp;
    }
    refresh() {
        if (this._lifebar) {
            this._lifebar.refresh(this.hp);
        }
    }
    getEnemiesAround(enemies) {
        const inRadius = enemies.filter((enemy) => {
            const distRow = enemy.row - this.row;
            const distCol = enemy.col - this.col;
            const dist = Math.abs(Math.sqrt(distRow * distRow + distCol * distCol));
            return dist <= this.info.radius;
        });
        return inRadius;
    }
    getClosestEnemy(enemies) {
        let closest = null;
        let minDist = 0;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const distRoW = enemy.row - this.row;
            const distCol = enemy.col - this.col;
            const dist = Math.abs(Math.sqrt(distRoW * distRoW + distCol * distCol));
            if (i == 0 || dist < minDist) {
                closest = enemies[i];
                minDist = dist;
            }
        }
        return closest;
    }
    calculateNextTargetNode(cellSize = 25) {
        const path = this._path;
        // si on est au bout du chemin alors on ne fait rien
        if (path.length == 0) {
            this._nextTargetNode = null;
            return;
        }
        // s'il ne reste plus assez de cases à parcourir, (par rapport à notre vitesse),
        // alors, la dernière case est forcément notre cible
        // NOTA BENE on ajoute + 1 car la case où l'on se trouve est comprise dans le chemin
        const numCells = Math.round(this.info.speed) + 1;
        if (path.length < numCells) {
            this._nextTargetNode = path[path.length - 1];
        }
        else {
            this._nextTargetNode = path[numCells - 1];
        }
        if (this._nextTargetNode === null)
            return;
        const index = this._path.indexOf(this._nextTargetNode);
        const minipath = this._path.slice(0, index + 1);
        const points = minipath.map(node => {
            return { x: node.state.col * cellSize, y: node.state.row * cellSize };
        });
        this._mover.calc(this, points, 60);
    }
    interpolate(cellSize = 25) {
        if (this._nextTargetNode === null || this._currentEnemy !== null)
            return;
        this._mover.nextFrame();
    }
    move() {
        if (this._nextTargetNode === null || this._currentEnemy !== null)
            return;
        this.row = this._nextTargetNode.state.row;
        this.col = this._nextTargetNode.state.col;
        this.x = this.col * 25;
        this.y = this.row * 25;
        const index = this._path.indexOf(this._nextTargetNode);
        this._path.splice(0, index);
        this._nextTargetNode = null;
        return;
    }
    isDead() {
        return this.hp <= 0;
    }
    constructor() {
        super();
    }
}
exports.default = Fighter;
