export interface ZClass<T extends ZObject>
{
    new(): T;
}

export class ZObject 
{ 
    constructor() {
        
    }
    public static zmt:string = "zzz"
}