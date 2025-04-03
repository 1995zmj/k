import { GameInstance } from "./GameInstance";

export interface ZClass<T extends ZObject>
{
    new(): T;
}

export class ZObject 
{ 
    uid:number = -1
    constructor() {
        // this.uid = GameInstance.getInstance().getNextUid()
    }

    public destroy(){
        // GameInstance.getInstance().destroyObject(this)
    }
}