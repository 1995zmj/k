import { ConfigManager } from "../../Manager/ConfigManager";
import { GridConfigContainer } from "../../Config/GridConfigContainer";

export enum EUnitInfoType
{
    NONE,
    ANIMAL,
    BOX,
}

// export interface UnitInfoInterface
// {
//     _unitInfoId: number;
// }

export class UnitInfo
{
    public static className = "UnitInfo";

    private _unitInfoType: EUnitInfoType = EUnitInfoType.NONE;
    public get unitInfoType(): EUnitInfoType
    {
        return this._unitInfoType;
    }
    public set unitInfoType(value: EUnitInfoType)
    {
        this._unitInfoType = value;
    }

}

export class AnimalUnitInfo extends UnitInfo
{
    public static className = "AnimalUnitInfo";

    private _id: number = 0;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
    }

    private _isFromBuy: boolean = true;
    public get isFromBuy(): boolean
    {
        return this._isFromBuy;
    }
    public set isFromBuy(value: boolean)
    {
        this._isFromBuy = value;
    }
}

export class BoxUnitInfo extends UnitInfo
{
    public static className = "BoxUnitInfo";

    private _id: number = 0;
    public get id(): number
    {
        return this._id;
    }
    public set id(value: number)
    {
        this._id = value;
    }

    private _isFromBuy: boolean = true;
    public get isFromBuy(): boolean
    {
        return this._isFromBuy;
    }
    public set isFromBuy(value: boolean)
    {
        this._isFromBuy = value;
    }
}

export class PlatformUnitInfo
{
    public static className = "PlatformUnitInfo";

    public _index: number = 0;
    public get index(): number
    {
        return this._index;
    }
    public set index(value: number)
    {
        this._index = value;
    }

    public _unitInfo: UnitInfo = new UnitInfo;
    public get unitInfo(): UnitInfo
    {
        return this._unitInfo;
    }
    public set unitInfo(value: UnitInfo)
    {
        this._unitInfo = value;
    }
}

export class WarPlatformInfo
{
    public static className = "WarPlatformInfo";

    constructor(storageKey?:string){
        this.storageKey = storageKey;    
    }

    storageKey: string = null;


    unitInfoList: PlatformUnitInfo[] = [];

    init()
    {
        let container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;
        let data = container.getGridConfigData();
        for (let index = 0; index < data.length; index++) {
            this.unitInfoList.push(new PlatformUnitInfo());
        }
        cc.log(this.unitInfoList);
    }

    addUnitInfo(unitInfo:UnitInfo)
    {
        let array = this.unitInfoList;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if(element.unitInfo.unitInfoType == EUnitInfoType.NONE)
            {
                this.unitInfoList[index].unitInfo = unitInfo;
                break;
            }
        }
    }
}