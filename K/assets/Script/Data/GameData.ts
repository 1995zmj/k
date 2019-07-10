import { DataStorageManager } from "../Manager/DataStorageManager";
// import { WarPlatformInfo, AnimalUnitInfo } from "./WarPlatformInfo";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "./ListenerType";
import { TimeManager } from "../Manager/TimeManager";
import { ConstValue } from "./ConstValue";
import Animal from "../Object/Animal";
import { PlayerInfo } from "./Info/PlayerInfo";
import { ShopInfo } from "./Info/ShopInfo";
import { WarPlatformInfo, AnimalUnitInfo, UnitInfo, EUnitInfoType } from "./Info/WarPlatformInfo";
import { EUIType } from "../UI/BaseUI";


export class GameData
{
    playerInfo: PlayerInfo = new PlayerInfo();
    shopInfo: ShopInfo = new ShopInfo();
    warPlatformInfo: WarPlatformInfo = new WarPlatformInfo();

    private timestamp: number = 0;
    public evenTimeCD: number = 0;


    constructor()
    {
        ListenerManager.getInstance().on(ListenerType.LoopUpdate, this.onUpdate, this);
    }

    onUpdate(dt)
    {
        // this.updateTime(dt);
        // this.updateEventTime(dt);
    }

    initPlayerInfo()
    {
        // DataStorageManager.getInstance().initObjData(PlayerInfo.className, this.playerInfo);
    }

    initShopInfo()
    {
        // this.shopInfo.initData(DataStorageManager.getInstance().getDataFromLocalData(this.shopInfo.storageKey, this.shopInfo));
    }

    initWarPlatformInfo()
    {
        this.warPlatformInfo.init();
        // this.shopInfo.initData(DataStorageManager.getInstance().getDataFromLocalData(this.shopInfo.storageKey, this.shopInfo));
    }

    //没有key 更新全部的数据，有key更新特定的
    updatePlayerInfo(key?: string)
    {
        // DataStorageManager.getInstance().setObjData(PlayerInfo.className, this.playerInfo, key);
    }

    updateShopInfo(key?: string)
    {
        // DataStorageManager.getInstance().setObjData(this.shopInfo.storageKey, this.shopInfo, key);
    }

    updateTime(dt)
    {

    }

    // updateEventTime(dt) {

    //     if (this.evenTimeCD <= 0) {
    //         this.evenTimeCD = 30;
    //         // this.playerInfo.saveEvenTime = TimeManager.getInstance().getCurrentTime();
    //     }else{
    //         this.evenTimeCD -= dt;
    //         ListenerManager.getInstance().emit(ListenerType.UpdateShopTimeUI);
    //     }
    // }

    // calculateOfflineTime() {
    //     this.timestamp = TimeManager.getInstance().getCurrentTime();

    //     let interval = this.timestamp - this.playerInfo.saveEvenTime;
    //     this.evenTimeCD = interval % ConstValue.EVENT_TIME_CD;
    // }

    buyAnimal(id: number)
    {
        // this.shopInfo.getShopProduct(id).buyCount++;
        // cc.log(this.shopInfo);
        let animal = new AnimalUnitInfo();
        animal.unitInfoType = EUnitInfoType.ANIMAL
        animal.id = id;
        animal.isFromBuy = true;
        let index = this.warPlatformInfo.getIdelePlatformUnitInfoId();
        if (index != null)
        {
            this.warPlatformInfo.unitInfoList[index].unitInfo = animal;
            cc.log(index);
            ListenerManager.getInstance().emit(ListenerType.OnGetAnimal, this.warPlatformInfo.unitInfoList[index]);
        }

    }
}