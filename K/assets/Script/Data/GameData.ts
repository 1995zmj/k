import { PlayerInfo } from "./PlayerInfo";
import { DataStorageManager } from "../Manager/DataStorageManager";
import { ShopInfo } from "./ShopInfo";
import { WarPlatformInfo, AnimalUnitInfo } from "./WarPlatformInfo";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "./ListenerType";
import { TimeManager } from "../Manager/TimeManager";
import { ConstValue } from "./ConstValue";
import Animal from "../Object/Animal";


export class GameData
{
    playerInfo: PlayerInfo = new PlayerInfo();
    shopInfo: ShopInfo = new ShopInfo();
    warPlatformInfo: WarPlatformInfo = new WarPlatformInfo();

    private timestamp: number = 0;
    public evenTimeCD: number = 0;


    constructor() {

        ListenerManager.getInstance().on(ListenerType.LoopUpdate, this.onUpdate, this);
    }

    onUpdate(dt) {
        this.updateEventTime(dt);
    }

    initPlayerInfo() {
        DataStorageManager.getInstance().initObjData(PlayerInfo.className, this.playerInfo);
    }

    initShopInfo() {
        DataStorageManager.getInstance().initObjData(ShopInfo.className, this.shopInfo);
    }

    //没有key 更新全部的数据，有key更新特定的
    updatePlayerInfo(key?: string) {
        DataStorageManager.getInstance().setObjData(PlayerInfo.className, this.playerInfo, key);
    }

    updateShopInfo(key?: string) {
        DataStorageManager.getInstance().setObjData(ShopInfo.className, this.shopInfo, key);
    }

    updateEventTime(dt) {

        if (this.evenTimeCD <= 0) {
            this.evenTimeCD = 30;
            // this.playerInfo.saveEvenTime = TimeManager.getInstance().getCurrentTime();
        }else{
            this.evenTimeCD -= dt;
            ListenerManager.getInstance().emit(ListenerType.UpdateShopTimeUI);
        }
    }

    calculateOfflineTime() {
        this.timestamp = TimeManager.getInstance().getCurrentTime();

        let interval = this.timestamp - this.playerInfo.saveEvenTime;
        this.evenTimeCD = interval % ConstValue.EVENT_TIME_CD;
    }

    buyAnimal(id:number)
    {
        this.shopInfo.getShopProduct(id).buyCount++;
        cc.log(this.shopInfo);
        let animal = new AnimalUnitInfo();
        animal.id = id;
        animal.isFromBuy = true;

        // this.warPlatformInfo.

    }
}