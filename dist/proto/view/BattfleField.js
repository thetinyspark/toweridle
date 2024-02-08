"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moocaccino_barista_1 = require("@thetinyspark/moocaccino-barista");
const BattleFieldEvent_1 = require("../event/BattleFieldEvent");
class BattleField extends moocaccino_barista_1.DisplayObjectContainer {
    _spriteFactory;
    _attackersBeyondGate = [];
    _spawnersAtk = [];
    _spawnersDfd = [];
    _level = null;
    _pathfinder = null;
    _graphe = null;
    _door = null;
    constructor(_spriteFactory) {
        super();
        this._spriteFactory = _spriteFactory;
        this.addChild = this.addChild.bind(this);
        this.doCycle = this.doCycle.bind(this);
        this.predictNextTargetNodes = this.predictNextTargetNodes.bind(this);
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
        this.initDoor();
    }
    initDoor() {
        this._door = this._spriteFactory.createFighter(this._level.door, this._level.targetRow, this._level.targetCol, 25);
        this.addChild(this._door);
    }
    getDefenders(withDoor = true) {
        const defenders = this._spawnersDfd.flatMap(s => s.getFighters());
        if (this._door != null && withDoor && !this._door.isDead())
            defenders.push(this._door);
        return defenders;
    }
    getAttackers() {
        return this._spawnersAtk.flatMap(s => s.getFighters());
    }
    fight() {
        const attackers = this.getAttackers();
        ;
        const defenders = this.getDefenders();
        // atk + def
        attackers.forEach((fighter) => {
            fighter.fight();
        });
        defenders.forEach((fighter) => {
            fighter.fight();
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
        if (this._door.isDead() && this.contains(this._door)) {
            this.removeChild(this._door);
        }
    }
    checkAttackersBeyondDoor() {
        if (this._door.isDead() === false)
            return;
        const row = this._level.targetRow;
        const col = this._level.targetCol;
        // count attackers who passes the gate
        this._spawnersAtk.forEach((spawner) => {
            spawner.getFighters().filter(f => f.row == row && f.col === col).forEach((fighter) => {
                spawner.removeFighter(fighter);
                this.removeChild(fighter);
                this._attackersBeyondGate.push(fighter);
            });
        });
    }
    refreshLifebars() {
        const attackers = this.getAttackers();
        const defenders = this.getDefenders();
        const fighters = attackers.concat(defenders);
        fighters.forEach((fighter) => {
            fighter.refresh();
        });
    }
    moveFighters() {
        const attackers = this.getAttackers();
        ;
        const defenders = this.getDefenders();
        const fighters = attackers.concat(defenders);
        fighters.forEach((fighter) => {
            fighter.move();
        });
    }
    predictNextTargetNodes() {
        const attackers = this.getAttackers();
        ;
        const defenders = this.getDefenders();
        const fighters = attackers.concat(defenders);
        fighters.forEach((fighter) => {
            fighter.calculateNextTargetNode();
        });
    }
    setFightersPath() {
        const attackers = this.getAttackers();
        const defenders = this.getDefenders();
        attackers.forEach((fighter) => {
            const row = fighter.row;
            const col = fighter.col;
            const startNode = this._graphe.getAt(row, col);
            const endNode = this._graphe.getAt(this._level.targetRow, this._level.targetCol);
            const path = this._pathfinder.findPath(this._graphe, startNode, endNode, false);
            fighter.setPath(path);
        });
        defenders.forEach((fighter) => {
            const enemy = fighter.getClosestEnemy(attackers);
            if (enemy == null) {
                return;
            }
            const startNode = this._graphe.getAt(fighter.row, fighter.col);
            const endNode = this._graphe.getAt(enemy.row, enemy.col);
            const path = this._pathfinder.findPath(this._graphe, startNode, endNode, false);
            fighter.setPath(path);
        });
    }
    searchForEnemies() {
        const attackers = this.getAttackers();
        ;
        const defenders = this.getDefenders();
        attackers.forEach((fighter) => {
            fighter.searchEnemy(defenders);
        });
        defenders.forEach((fighter) => {
            fighter.searchEnemy(attackers);
        });
    }
    spawnNewFighters() {
        this._spawnersAtk.forEach((spawner) => {
            const fighter = spawner.doCycle(this._spriteFactory);
            if (fighter !== null) {
                this.addChild(fighter);
            }
        });
        this._spawnersDfd.forEach((spawner) => {
            const fighter = spawner.doCycle(this._spriteFactory);
            if (fighter !== null)
                this.addChild(fighter);
        });
    }
    checkGameOver() {
        const attackersEmpty = this._spawnersAtk.map(s => s.isEmpty());
        const defendersEmpty = this._spawnersDfd.map(s => s.isEmpty());
        const uniqAtk = Array.from(new Set(attackersEmpty));
        const uniqDfd = Array.from(new Set(defendersEmpty));
        const noMoreAtk = !uniqAtk.includes(false);
        const noMoreDfd = !uniqDfd.includes(false);
        const isDoorDead = this._door.isDead();
        const numAttackerqBeyondGate = this._attackersBeyondGate.length;
        if (noMoreAtk || noMoreDfd) {
            this.emit(BattleFieldEvent_1.default.GAME_OVER, {
                noMoreAtk,
                noMoreDfd,
                isDoorDead,
                numAttackerqBeyondGate
            });
        }
    }
    doCycle() {
        this.spawnNewFighters();
        this.searchForEnemies();
        this.moveFighters();
        this.setFightersPath();
        this.fight();
        this.predictNextTargetNodes();
        this.refreshLifebars();
        this.checkAttackersBeyondDoor();
        this.checkGameOver();
    }
    interpolate() {
        // return;
        const attackers = this.getAttackers();
        const defenders = this.getDefenders();
        attackers.forEach((fighter) => {
            fighter.interpolate(25);
        });
        defenders.forEach((fighter) => {
            fighter.interpolate(25);
        });
    }
}
exports.default = BattleField;
