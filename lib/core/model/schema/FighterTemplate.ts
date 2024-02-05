export default class FighterTemplate{
    constructor(
        public id:number = -1, 
        public name:string = "",
        public speed:number = 0,
        public range:number = 0,
        public phyAtk:number = 0,
        public phyDef:number = 0,
        public magAtk:number = 0,
        public magDef:number = 0,
        public hp:number = 0
    ){}
}