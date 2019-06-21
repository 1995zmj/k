import { GameDataManager } from "../Manager/GameDataManager";

export class ShopUnitInfo
{
    public static className = "ShopUnitInfo";

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
}
export class ShopInfo
{
    public static className = "ShopInfo";

    private _shopUnitInfoList: ShopUnitInfo[] = [];

    getShopProduct(id): ShopUnitInfo
    {
        if (!this._shopUnitInfoList[id])
            this._shopUnitInfoList[id] = new ShopUnitInfo;

        return this._shopUnitInfoList[id];
    }
}