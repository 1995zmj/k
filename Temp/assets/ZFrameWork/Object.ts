export interface ZClass<T extends ZObject>
{
    new(): T;
}

export class ZObject 
{ 
    constructor() {
        
    }
    public static zmt:string = "zzz"

    // 要一个创建和销毁的函数
}