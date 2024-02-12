import { GameNode } from "../../../common/model/node";

export default class Fighter{
    constructor(
        public id:number, 
        public tplID:number, 
        public name:string,
        public speed:number ,
        public radius:number,
        public phyAtk:number ,
        public phyDef:number ,
        public magAtk:number ,
        public magDef:number ,
        public hp:number,
        public row:number = 0, 
        public col:number = 0,
        public enemy:Fighter = null,
        public path:GameNode[] = []
    ){}
}