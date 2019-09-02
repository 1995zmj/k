
export interface NodePoolClass<T extends BaseNodePool>
{
    new (callback: Function, caller: any, arg: any): T;
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
}
