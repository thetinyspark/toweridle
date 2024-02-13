import { FighterDescType } from "../lib/core/model/types/FighterDescType";
import { FighterPoolDescType } from "../lib/core/model/types/FighterPoolDescType";
import { SpawnerDescType } from "../lib/core/model/types/SpawnerDescType";
import { BattleFieldDescType } from "../lib/core/model/types/BattleFieldDescType";
import Fighter from "../lib/core/model/schema/Fighter";

export function DOOR_DESC_TYPE():FighterDescType{
    return {
        id: 1, 
        tplID: 3,
        name: "door",
        hp: 5000, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 0, 
        phyDef: 0, 
        radius: 0, 
        speed: 0, 
    }
}

export function ARCHER_DESC_TYPE():FighterDescType{
    return {
        id: 1, 
        tplID: 1,
        name: "archer",
        hp: 500, 
        magAtk: 0, 
        magDef: 2, 
        phyAtk: 10, 
        phyDef: 5, 
        radius: 4, 
        speed: 1, 
    }
}

export function KNIGH_DESC_TYPE():FighterDescType{
    return {
        id: 1, 
        tplID: 2,
        name: "knight",
        hp: 500, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 20, 
        phyDef: 10, 
        radius: 1, 
        speed: 2, 
    }
}

export function ARCHERS_POOL(amount:number = 10):FighterPoolDescType{
    return {
        amount, 
        desc: ARCHER_DESC_TYPE()
    }
}

export function SPAWNER1(amount:number = 10):SpawnerDescType{
    return {
        id: 1, 
        col: 11, 
        row : 14, 
        fighters: [
            ARCHERS_POOL(amount)
        ], 
        frequency: 1, 
        name: "spawner1", 
        ownerID: 1
    }

}

export function SPAWNER2(amount:number = 10):SpawnerDescType{
    return {
        id: 2, 
        col: 11, 
        row : 1, 
        fighters: [
            ARCHERS_POOL(amount)
        ], 
        frequency: 2, 
        name: "spawner2", 
        ownerID: 2
    }
}

export function EMPTY_SPAWNER():SpawnerDescType{
    return {
        id: 1, 
        col: 11, 
        row : 14, 
        fighters: [
            ARCHERS_POOL(0)
        ], 
        frequency: 1, 
        name: "EmptySpawner", 
        ownerID: 1
    }
}

export function SPAWN_ONCE():SpawnerDescType{
    return {
        id: 1, 
        col: 11, 
        row : 14, 
        fighters: [
            ARCHERS_POOL(1)
        ], 
        frequency: 1, 
        name: "EmptySpawner", 
        ownerID: 1
    }
}

export function SPAWNER(row:number, col:number, amount:number, frequency:number):SpawnerDescType{
    return {
        id: 1, 
        col: col, 
        row : row, 
        fighters: [
            ARCHERS_POOL(amount)
        ], 
        frequency: frequency, 
        name: "EmptySpawner", 
        ownerID: 1
    }
}


export function PLAYGROUND():number[][]{
    return  [
        [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
        [1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,0,1,0,1],
        [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1]
    ]
}

export function BIG_PLAYGROUND():number[][]{
    return  [
        [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1],
        [1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,0,1,0,1,0,0,0,0,0,1,1,1,0,1,0,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1],
        [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,0,0,1,0,1,1,0,1,1,1,1],
        [1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]
}

export function PLAYGROUND_METADATA():any{
    return {
        fighterRow: 1,
        fighterCol: 1,
        enemyRow: 13,
        enemyCol: 22,
        doorRow: 0,
        doorCol: 11,
    }
}

export function BATTLEFIELD1():BattleFieldDescType{
    return {
        id: 1,
        name: "plaines ensanglantées",
        atkSpawners: [SPAWNER1()],
        dfdSpawners: [SPAWNER2()],
        attackerID: 1, 
        defenderID: 2, 
        door: DOOR_DESC_TYPE(), 
        grid: PLAYGROUND(), 
        targetCol: 11,
        targetRow: 0,
    }
}

export function BATTLEFIELD2():BattleFieldDescType{
    return {
        id: 2,
        name: "château hanté",
        atkSpawners: [SPAWNER1(), SPAWNER1()],
        dfdSpawners: [SPAWNER2(), SPAWNER2(), SPAWNER2()],
        attackerID: 1, 
        defenderID: 2, 
        door: DOOR_DESC_TYPE(), 
        grid: PLAYGROUND(), 
        targetCol: 11,
        targetRow: 11,
    }
}

export function BATTLEFIELD3():BattleFieldDescType{
    return {
        id: 3,
        name: "marais du vide",
        atkSpawners: [SPAWN_ONCE()],
        dfdSpawners: [EMPTY_SPAWNER()],
        attackerID: 1, 
        defenderID: 2, 
        door: DOOR_DESC_TYPE(), 
        grid: PLAYGROUND(), 
        targetCol: 11,
        targetRow: 11,
    }
}

export function BATTLEFIELD4():BattleFieldDescType{
    return {
        id: 1,
        name: "minimap",
        atkSpawners: [SPAWNER(0,0,1,1)],
        dfdSpawners: [SPAWNER(1,1,1,1)],
        attackerID: 1, 
        defenderID: 2, 
        door: DOOR_DESC_TYPE(), 
        grid: [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ], 
        targetCol: 3,
        targetRow: 3,
    }
}

export function BATTLEFIELD5():BattleFieldDescType{
    return {
        id: 1,
        name: "plaines ensanglantées",
        atkSpawners: [SPAWNER1(1000), SPAWNER1(1000), SPAWNER1(1000)],
        dfdSpawners: [SPAWNER2(1000), SPAWNER2(1000), SPAWNER2(1000)],
        attackerID: 1, 
        defenderID: 2, 
        door: DOOR_DESC_TYPE(), 
        grid: BIG_PLAYGROUND(), 
        targetCol: 11,
        targetRow: 0,
    }
}

export function ENNEMIES(numRows:number = 10, numCols:number = 10):Fighter[]{
    const ennemies:Fighter[] = []; 
    let id = 0;
    for( let i = 0; i < numRows; i++ ){
      for( let j = 0; j < numCols; j++ ){
        ennemies.push( 
            new Fighter(++id, 1, "fighter_"+id, 1, 1, 1, 1, 1, 1, 1, i, j)
        );
      }
    }

    return ennemies;
}
