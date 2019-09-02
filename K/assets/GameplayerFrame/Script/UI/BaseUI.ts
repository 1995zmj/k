import { ConstValue } from "../Data/ConstValue";
import { ListenerManager } from "../Manager/ListenerManager";

export enum EUIType
{
    POP_UI,
    MAIN_UI,
}

export interface UIClass<T extends BaseUI>
{
    new(): T;
    getUrl(): string;
}

const {ccclass, property} = cc._decorator;
@ccclass
export abstract class BaseUI extends cc.Component
{
    protected static className = "BaseUI";

    public uiType = EUIType.POP_UI;

    protected mTag: any;
    public get tag(): any
	{
		return this.mTag;
	}
	public set tag(value: any)
	{
		this.mTag = value;
    }
    
    public static getUrl(): string
    {
        // cc.log(this.className);
        return ConstValue.PREFAB_UI_DIR + this.className;
    }

    onDestroy(): void
    {
        ListenerManager.getInstance().targetOff(this);
    }

    onShow()
    {
        cc.log("BaseUI onShow");
    }
}