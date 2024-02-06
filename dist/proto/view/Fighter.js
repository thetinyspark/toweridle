"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
class Fighter extends moocaccino_barista_1.DisplayObjectContainer {
    info;
    hp;
    targetX = 0;
    targetY = 0;
    _path = [];
    _lifebar = null;
    _currentEnemy = null;
    addLifeBar(lifeBar) {
        this._lifebar = lifeBar;
        this.addChild(lifeBar);
    }
    init(info, row, col, size = 25) {
        this.info = info;
        this.hp = this.info.hp;
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
    getRow(cellSize = 25) {
        return Math.round(this.y / cellSize);
    }
    getCol(cellSize = 25) {
        return Math.round(this.x / cellSize);
    }
    fight(enemies) {
        const inRadius = this.getEnemiesAround(enemies);
        const enemy = this.getClosestEnemy(inRadius);
        this._currentEnemy = enemy;
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
    refresh(cellSize) {
        if (this._currentEnemy == null)
            return this.move(cellSize);
        if (this._lifebar) {
            this._lifebar.refresh(this.hp);
        }
    }
    getEnemiesAround(enemies) {
        const inRadius = enemies.filter((enemy) => {
            const distX = enemy.x - this.x;
            const distY = enemy.y - this.y;
            const dist = Math.sqrt(distX * distX + distY * distY);
            return dist <= this.info.radius;
        });
        return inRadius;
    }
    getClosestEnemy(enemies) {
        let closest = null;
        let minDist = 0;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            const distX = enemy.x - this.x;
            const distY = enemy.y - this.y;
            const dist = Math.sqrt(distX * distX + distY * distY);
            if (i == 0 || dist < minDist) {
                closest = enemies[i];
                minDist = dist;
            }
        }
        return closest;
    }
    move(cellSize = 25) {
        const path = this._path;
        if (path.length == 0)
            return;
        // on vérifie la case sur laquelle on se trouve
        const row = this.getRow(cellSize);
        const col = this.getCol(cellSize);
        // puis on vérifie si c'est la première case du chemin
        if (path[0].state.col == col && path[0].state.row == row) {
            const targetX = path[0].state.col * cellSize;
            const targetY = path[0].state.row * cellSize;
            const distX = targetX - this.x;
            const distY = targetY - this.y;
            // si c'est le cas on la retire du chemin
            if (Math.abs(distX) <= this.info.speed && Math.abs(distY) <= this.info.speed) {
                path.shift();
                // si il ne reste plus aucune case alors on est arrivé à destination
                if (path.length == 0)
                    return;
            }
        }
        // sinon on définit la prochaine cible
        const targetX = path[0].state.col * cellSize;
        const targetY = path[0].state.row * cellSize;
        const distX = targetX - this.x;
        const distY = targetY - this.y;
        const speedX = distX > 0 ? this.info.speed : distX < 0 ? -this.info.speed : 0;
        const speedY = distY > 0 ? this.info.speed : distY < 0 ? -this.info.speed : 0;
        this.x += speedX;
        this.y += speedY;
    }
    constructor() {
        super();
    }
}
exports.default = Fighter;
