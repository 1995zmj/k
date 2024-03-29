import { PlayerInfo } from "../../../MergeGame/Common/Script/Data/Info/PlayerInfo";
import { ShopInfo } from "../../../MergeGame/Common/Script/Data/Info/ShopInfo";
import { WarPlatformInfo, AnimalUnitInfo } from "../../../MergeGame/Common/Script/Data/Info/WarPlatformInfo";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "./ListenerType";
import { DataStorageManager } from "../Manager/DataStorageManager";
import { HelpTool } from "../../../MergeGame/Util/HelpTool";

export class GameData
{
    playerInfo: PlayerInfo = new PlayerInfo();
    shopInfo: ShopInfo = new ShopInfo("ShopInfo");
    warPlatformInfo: WarPlatformInfo = new WarPlatformInfo("WarPlatformInfo");

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
        // this.warPlatformInfo.initData(DataStorageManager.getInstance().getDataFromLocalData(this.warPlatformInfo.storageKey, this.warPlatformInfo));
    }

    //没有key 更新全部的数据，有key更新特定的
    updatePlayerInfo(key?: string)
    {
        DataStorageManager.getInstance().setObjData(this.warPlatformInfo.storageKey, this.warPlatformInfo, key);
    }

    updateShopInfo(key?: string)
    {
        DataStorageManager.getInstance().setObjData(this.shopInfo.storageKey, this.shopInfo, key);
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
        let animal = new AnimalUnitInfo(id, true);
        let index = this.warPlatformInfo.getIdelePlatformUnitInfoId();
        if (index != null)
        {
            this.warPlatformInfo.PlatformUnitInfoList[index].unitInfo = animal;
            cc.log(index);
            ListenerManager.getInstance().emit(ListenerType.OnGetAnimal, this.warPlatformInfo.PlatformUnitInfoList[index]);
        }
        else
        {
            HelpTool.showTip("no have platform");
        }
    }
}