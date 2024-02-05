import Fighter from "../lib/core/model/schema/Fighter";
import FighterTemplate from "../lib/core/model/schema/FighterTemplate";
import { FighterDescType } from "../lib/core/model/types/FighterDescType";
import { GameDataType } from "../lib/core/model/types/GameDataType";
import { FighterTemplateDescType } from "../lib/core/model/types/FighterTemplateDescType";

// game data type
export function GAME_SAVE_DESC():GameDataType{
    return {
        templates: [ARCHER_LVL1_TPL_DESC(), WIZARD_LVL1_TPL_DESC(), KNIGHT_LVL1_TPL_DESC(), MONK_LVL1_TPL_DESC()]
    }
}

// template fighters desc
export function ARCHER_LVL1_TPL_DESC():FighterTemplateDescType{
    return {
        id: 1, 
        name: "Archer Lvl 1", 
        hp: 100, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 2, 
        phyDef: 0, 
        range: 10, 
        speed: 2
    }
};

export function WIZARD_LVL1_TPL_DESC():FighterTemplateDescType{
    return {
        id: 2, 
        name: "Wizard Lvl 1", 
        hp: 100, 
        magAtk: 2, 
        magDef: 0, 
        phyAtk: 0, 
        phyDef: 0, 
        range: 10, 
        speed: 2
    }
};

export function KNIGHT_LVL1_TPL_DESC():FighterTemplateDescType{
    return {
        id: 3, 
        name: "Knight Lvl 1", 
        hp: 100, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 5, 
        phyDef: 0, 
        range: 2, 
        speed: 3
    }
};

export function MONK_LVL1_TPL_DESC():FighterTemplateDescType{
    return {
        id: 4, 
        name: "Monk Lvl 1", 
        hp: 100, 
        magAtk: 5, 
        magDef: 0, 
        phyAtk: 0, 
        phyDef: 0, 
        range: 2, 
        speed: 3
    }
};


// actual fighters desc
export function ARCHER_LVL1_DESC():FighterDescType{
    return {
        id: 1, 
        tplID: 1, 
        name: "Archer Lvl 1", 
        hp: 100, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 2, 
        phyDef: 0, 
        range: 10, 
        speed: 2
    }
};

export function WIZARD_LVL1_DESC():FighterDescType{
    return {
        id: 2, 
        tplID: 2, 
        name: "Wizard Lvl 1", 
        hp: 100, 
        magAtk: 2, 
        magDef: 0, 
        phyAtk: 0, 
        phyDef: 0, 
        range: 10, 
        speed: 2
    }
};

export function KNIGHT_LVL1_DESC():FighterDescType{
    return {
        id: 3, 
        tplID: 3, 
        name: "Knight Lvl 1", 
        hp: 100, 
        magAtk: 0, 
        magDef: 0, 
        phyAtk: 5, 
        phyDef: 0, 
        range: 2, 
        speed: 3
    }
};

export function MONK_LVL1_DESC():FighterDescType{
    return {
        id: 4, 
        tplID:4,
        name: "Monk Lvl 1", 
        hp: 100, 
        magAtk: 5, 
        magDef: 0, 
        phyAtk: 0, 
        phyDef: 0, 
        range: 2, 
        speed: 3
    }
};


export function createFighterTemplate(desc:FighterTemplateDescType):FighterTemplate{
    return new FighterTemplate( desc.id, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
}

export function createFighter(desc:FighterDescType):Fighter{
    return new Fighter( desc.id, desc.tplID, desc.name, desc.speed, desc.range, desc.phyAtk, desc.phyDef, desc.magAtk, desc.magDef, desc.hp);
}
