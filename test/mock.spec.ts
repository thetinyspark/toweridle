import { FighterDescType } from "../lib/core/model/types/FighterDescType";
import { FighterPoolDescType } from "../lib/core/model/types/FighterPoolDescType";
import { SpawnerDescType } from "../lib/core/model/types/SpawnerDescType";
import { BattleFieldDescType } from "../lib/core/model/types/BattleFieldDescType";

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

export function SPAWNER1():SpawnerDescType{
    return {
        id: 1, 
        col: 11, 
        row : 14, 
        fighters: [
            ARCHERS_POOL()
        ], 
        frequency: 1, 
        name: "spawner1", 
        ownerID: 1
    }

}

export function SPAWNER2():SpawnerDescType{
    return {
        id: 2, 
        col: 11, 
        row : 1, 
        fighters: [
            ARCHERS_POOL()
        ], 
        frequency: 1, 
        name: "spawner2", 
        ownerID: 2
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
        targetRow: 11,
    }
}
