import { GameDataManager } from "../Manager/GameDataManager";

export class ShopProductInfo
{
    public static className = "ShopProductInfo";

    public _buyCount: number = 0;
    public get buyCount(): number
    {
        return this._buyCount;
    }
    public set buyCount(value: number)
    {
        this._buyCount = value;
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

    public _shopProductList: ShopProductInfo[] = [];
    public get shopProductList(): ShopProductInfo[]
    {
        return this._shopProductList;
    }
    public set shopProductList(value: ShopProductInfo[])
    {
        this._shopProductList = value;
        GameDataManager.getInstance().getGameData().updateShopInfo("_shopProductList");
    }

    getShopProduct(id): ShopProductInfo
    {
        if (!this.shopProductList[id])
            this.shopProductList[id] = new ShopProductInfo;

        return this.shopProductList[id];
    }
}