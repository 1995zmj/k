
export interface NodePoolClass<T extends BaseNodePool>
{
    new (size:number,callback: Function, caller: any, arg: any): T;
}

export abstract class BaseNodePool
{
    protected static className = "BaseNodePool"

    protected mTag: any;
    public get tag(): any
	{
		return this.mTag;
	}
	public set tag(value: any)
	{
		this.mTag = value;
    }

    // public static getUrl(): string
    // {
    //     cc.log(this.className);
    //     return ConstValue.PREFAB_UI_DIR + this.className;
    // }

    // get()
    // {
        
    // }

    // put(node: cc.Node)
    // {

    // }

}
