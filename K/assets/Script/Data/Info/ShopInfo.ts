

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

    initData(data: object)
    {
        for (const key in data) {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                let element = data[key];
                if(key == "_shopUnitInfoList")
                {
                    this.initShopUnitInfoList(element);
                }
            }
        }
    }

    initShopUnitInfoList(data:Array<object>)
    {
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