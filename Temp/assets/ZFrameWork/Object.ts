export interface ZClass<T extends ZObject>
{
    new(): T;
}

export class ZObject 
{ 
    uid:number = 0
    constructor() {
        
    }
    public static zmt:string = "zzz"
    public static destroy(object: ZObject){
        object.onDestroy()
    }

    public onDestroy(){

    }
}