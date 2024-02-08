import {GameNode } from "@thetinyspark/moocaccino-barista";
import Fighter from "./Fighter";

export default class Door extends Fighter{
    public setPath(path:GameNode[]):void{
        super.setPath([]);
    }
    constructor(){
        super();
    }
}