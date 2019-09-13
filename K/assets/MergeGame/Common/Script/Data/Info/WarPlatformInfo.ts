import { GridConfigContainer } from "../../Config/GridConfigContainer";
import { ConfigManager } from "../../../../../GameplayerFrame/Script/Manager/ConfigManager";

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

    constructor(id: number, isFromBuy: boolean)
    {
        super();
        this.unitInfoType = EUnitInfoType.ANIMAL;
        this.id = id;
        this.isFromBuy = isFromBuy;
    }

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

    constructor()
    {
        super();
        this.unitInfoType = EUnitInfoType.BOX;
    }

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

    private _index: number = 0;
    public get index(): number
    {
        return this._index;
    }
    public set index(value: number)
    {
        this._index = value;
    }

    private _unitInfo: UnitInfo = new UnitInfo;
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

    constructor(storageKey?: string)
    {
        this.storageKey = storageKey;
    }

    public storageKey: string = null;

    public PlatformUnitInfoList: PlatformUnitInfo[] = [];

    init()
    {
        let container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;
        let data = container.getGridConfigData();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                let platformUnitInfo = new PlatformUnitInfo();
                platformUnitInfo.index = Number(key);
                this.PlatformUnitInfoList[key] = platformUnitInfo;
            }
        }
        cc.log(this.PlatformUnitInfoList);
    }

    initData(data: object)
    {
        cc.log(data);
        for (const key in data)
        {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key))
            {
                let element = data[key];
            }
        }
    }

    getIdelePlatformUnitInfoId(): number
    {
        let array = this.PlatformUnitInfoList;
        for (let index = 0; index < array.length; index++)
        {
            const element = array[index];
            if (element.unitInfo.unitInfoType == EUnitInfoType.NONE)
            {
                return index;
            }
        }
        return null;
    }
}