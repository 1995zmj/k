import { GameDataManager } from "../../Manager/GameDataManager";
import { PlayerInfo } from "./PlayerInfo";

export class ShopUnitInfo
{
    public static className = "ShopUnitInfo";

    constructor(data?:object){
        for (const key in data) {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                let element = data[key];
                this[key] = element;
            }
        }       
    }

    public _buyCount: number = 0;
    public get buyCount(): number
    {
        return this._buyCount;
    }
    public set buyCount(value: number)
    {
        this._buyCount = value;
        GameDataManager.getInstance().getGameData().updateShopInfo("_shopUnitInfoList");
    }

    public _price: string = "";
    public get price(): string
    {
        return this._price;
    }
    public set price(value: string)
    {
        this._price = value;
    }

    initData(data: object)
    {
        for (const key in data) {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                let element = data[key];
                this[key] = element;
            }
        } 
    }
}
export class ShopInfo
{
    storageKey: string = null;

    constructor(storageKey?:string){
        this.storageKey = storageKey;    
        this.player = new PlayerInfo(storageKey + "_playerinfo");
    }

    private _shopUnitInfoList: ShopUnitInfo[] = [];
    public get shopUnitInfoList(): ShopUnitInfo[]
    {
        return this._shopUnitInfoList;
    }
    public set shopUnitInfoList(value: ShopUnitInfo[])
    {
        this._shopUnitInfoList = value;
    }

    private _player: PlayerInfo = null;
    public get player(): PlayerInfo
    {
        return this._player;
    }
    public set player(value: PlayerInfo)
    {
        this._player = value;
    }

    initData(data: object)
    {
        cc.log("data",data);
        for (const key in data) {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                let element = data[key];
                if(key == "_shopUnitInfoList")
                {
                    this.initShopUnitInfoList(element);
                }else(key == "_playerinfo")
                {
                    this.player.initData(element);
                }
            }
        }
        cc.log("init",this);

    }

    initShopUnitInfoList(data:Array<object>)
    {
        cc.log("zmj",data);
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let unitInfo = new ShopUnitInfo(data[key]);
                this._shopUnitInfoList.push(unitInfo);
            }
        }
    }

    getShopProduct(id): ShopUnitInfo
    {
        if (!this._shopUnitInfoList[id])
            this._shopUnitInfoList[id] = new ShopUnitInfo();

        return this._shopUnitInfoList[id];
    }
}