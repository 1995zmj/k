import { ZObject } from "./Object";

export class ZUnit extends ZObject
{
    bDestroy:boolean = false;

    public preInit()
    {
        console.log("preInit unit");
    }

    public destory()
    {
        this.bDestroy = true;
        console.log("destory unit");
    }
}