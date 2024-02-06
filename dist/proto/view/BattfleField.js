"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
class BattleField extends moocaccino_barista_1.DisplayObjectContainer {
    _spriteFactory;
    _spawnersAtk = [];
    _spawnersDfd = [];
    _level = null;
    _pathfinder = null;
    _graphe = null;
    constructor(_spriteFactory) {
        super();
        this._spriteFactory = _spriteFactory;
        this.addChild = this.addChild.bind(this);
        this.doCycle = this.doCycle.bind(this);
        this.cycleLoop = this.cycleLoop.bind(this);
    }
    init(level) {
        this.removeChildren();
        for (let i = 0; i < level.data.length; i++) {
            const row = level.data[i];
            for (let j = 0; j < row.length; j++) {
                this.addChild(this._spriteFactory.createMapElement(row[j], i, j));
            }
        }
        this._spawnersAtk = level.attackerSpawners.map(this._spriteFactory.createSpawner);
        this._spawnersDfd = level.defenderSpawners.map(this._spriteFactory.createSpawner);
        this._spawnersAtk.forEach(this.addChild);
        this._spawnersDfd.forEach(this.addChild);
        this._level = level;
        const grid = moocaccino_barista_1.Grid2D.from(this._level.data);
        this._pathfinder = new moocaccino_barista_1.PathFinder2D();
        this._graphe = this._pathfinder.createGraphe(grid, 0);
        this.cycleLoop();
    }
    fight() {
        const attackers = this._spawnersAtk.flatMap(s => s.getFighters());
        const defenders = this._spawnersDfd.flatMap(s => s.getFighters());
        // atk + def
        attackers.forEach((fighter) => {
            fighter.fight(defenders);
        });
        defenders.forEach((fighter) => {
            fighter.fight(attackers);
        });
        // count deads and remove them from spawners
        this._spawnersAtk.forEach((spawner) => {
            spawner.getFighters().filter(f => f.hp <= 0).forEach((dead) => {
                spawner.removeFighter(dead);
                this.removeChild(dead);
            });
        });
        this._spawnersDfd.forEach((spawner) => {
            spawner.getFighters().filter(f => f.hp <= 0).forEach((dead) => {
                spawner.removeFighter(dead);
                this.removeChild(dead);
            });
        });
    }
    refresh() {
        const attackers = this._spawnersAtk.flatMap(s => s.getFighters());
        const defenders = this._spawnersDfd.flatMap(s => s.getFighters());
        // atk + def
        attackers.forEach((fighter) => {
            fighter.refresh(25);
        });
        defenders.forEach((fighter) => {
            fighter.refresh(25);
        });
    }
    cycleLoop() {
        this.doCycle();
        setTimeout(() => {
            this.cycleLoop();
        }, this._level.cycleInMs);
    }
    doCycle() {
        this._spawnersAtk.forEach((spawner) => {
            const fighter = spawner.doCycle(this._spriteFactory);
            if (fighter !== null) {
                this.addChild(fighter);
                const row = fighter.getRow();
                const col = fighter.getCol();
                const startNode = this._graphe.getAt(row, col);
                const endNode = this._graphe.getAt(this._level.targetRow, this._level.targetCol);
                const path = this._pathfinder.findPath(this._graphe, startNode, endNode, false);
                fighter.setPath(path);
            }
        });
        this._spawnersDfd.forEach((spawner) => {
            const fighter = spawner.doCycle(this._spriteFactory);
            if (fighter !== null)
                this.addChild(fighter);
            const attackers = this._spawnersAtk.flatMap(s => s.getFighters());
            spawner.getFighters().forEach((fighter) => {
                if (fighter.getPath().length > 0)
                    return;
                const enemy = fighter.getClosestEnemy(attackers);
                if (enemy == null)
                    return;
                const startNode = this._graphe.getAt(fighter.getRow(), fighter.getCol());
                const endNode = this._graphe.getAt(enemy.getRow(), enemy.getCol());
                const path = this._pathfinder.findPath(this._graphe, startNode, endNode, false);
                fighter.setPath(path);
            });
        });
        this.fight();
    }
}
exports.default = BattleField;
