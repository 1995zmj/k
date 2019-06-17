import { ShopInfo } from "./ShopInfo";

export class UnitInfo
{
    type:string = ""
}

export class DragonInfo extends UnitInfo
{
    type = "Dragon"
    private _dragonId: number = 0;
    public get dragonId(): number
    {
        return this._dragonId;
    }
    public set dragonId(value: number)
    {
        this._dragonId = value;
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

export class BoxInfo extends UnitInfo
{
    type = "Box"
    private _boxId: number = 0;
    public get boxId(): number
    {
        return this._boxId;
    }
    public set boxId(value: number)
    {
        this._boxId = value;
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
    public _index: number = 0;
    public get index(): number
    {
        return this._index;
    }
    public set index(value: number)
    {
        this._index = value;
    }

    public _locked: boolean = true;
    public get locked(): boolean
    {
        return this._locked;
    }
    public set locked(value: boolean)
    {
        this._locked = value;
    }

    public _unitInfo: UnitInfo;
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

    unitInfoList: PlatformUnitInfo[] = [];
}