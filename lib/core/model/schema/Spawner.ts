import { GameNode } from "@thetinyspark/moocaccino-barista";
import Fighter from "./Fighter";

export default class Spawner extends GameNode{
    constructor(
        public id:number, 
        public ownerID:number, 
        public name:string,
        public row:number,
        public col:number,
        public fighters:Fighter[]
    ){
        super();
    }
}