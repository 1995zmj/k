export class ListenerManager
{
	private static instance: ListenerManager;

	public static getInstance(): ListenerManager
	{
		if (this.instance == null)
		{
			this.instance = new ListenerManager();
		}
		return this.instance;
	}

	public on(type: string, callback: Function, target: any, ): void
	{
		cc.director.on(type, callback, target);
	}

	// 额外参数只支持5个;
	public emit(type: string, ...argArray: any[]): void
	{
		cc.director.emit(type, ...argArray);
	}

	public targetOff(target: any)
	{
		cc.director.targetOff(target);
	}
}