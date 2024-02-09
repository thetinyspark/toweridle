import Fighter from "./Fighter";

export default class Spawner{
    constructor(
        public id:number, 
        public name:string,
        public ownerID:number, 
        public row: number,
        public col: number,
        public frequency:number,
        public fighters:Fighter[]
    ){}
}