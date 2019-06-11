import { PlayerInfo } from "./PlayerInfo";
import { DataStorageManager } from "../Manager/DataStorageManager";
import { ShopInfo } from "./ShopInfo";


export class GameData
{
    playerInfo: PlayerInfo = new PlayerInfo();
    shopInfo: ShopInfo = new ShopInfo();

    initPlayerInfo(){
        DataStorageManager.getInstance().initObjData(PlayerInfo.className,this.playerInfo);
    }

    initShopInfo(){
        DataStorageManager.getInstance().initObjData(ShopInfo.className,this.shopInfo);
    }

    //没有key 更新全部的数据，有key更新特定的
    updatePlayerInfo(key?: string)
    {
        DataStorageManager.getInstance().setObjData(PlayerInfo.className,this.playerInfo,key);
    }

    updateShopInfo(key?: string)
    {
        DataStorageManager.getInstance().setObjData(ShopInfo.className,this.shopInfo,key);
    }
}