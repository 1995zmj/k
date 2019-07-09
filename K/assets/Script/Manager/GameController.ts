import { ConfigManager } from "./ConfigManager";
import { PoolManager } from "./PoolManager";
import { GameDataManager } from "./GameDataManager";
import { ListenerManager } from "./ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { DataStorageManager } from "./DataStorageManager";
import { ShopUnitInfo } from "../Data/Info/ShopInfo";

export enum GameState
{
    IDLE,
    ANIM,
    PUSH,
    PAUSE,
    FISH,
    PULL,
    RESULT
}

export class GameController
{
    private static instance: GameController;
    public static getInstance(): GameController
    {
        if (this.instance == null)
        {
            this.instance = new GameController();
        }
        return this.instance;
    }

    gameState: GameState = GameState.IDLE;

    curLoadedCount: number = 0;
    sumLoadedCount: number = 0;

    public initGame()
    {
        this.sumLoadedCount = 2;
        ConfigManager.getInstance().loadAllConfig(() =>
        {
            this.curLoadedCount++;
            ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress, this.curLoadedCount / this.sumLoadedCount);
        });
        PoolManager.getInstance().loadAllNodePool(() =>
        {
            this.curLoadedCount++;
            ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress, this.curLoadedCount / this.sumLoadedCount);
        });


        // GameDataManager.getInstance().getGameData().shopInfo.shopUnitInfoList[0] = new ShopUnitInfo();
        // GameDataManager.getInstance().getGameData().shopInfo.shopUnitInfoList[0].price = "0";

        // GameDataManager.getInstance().getGameData().shopInfo.shopUnitInfoList[1] = new ShopUnitInfo();
        // GameDataManager.getInstance().getGameData().shopInfo.shopUnitInfoList[1].price = "1";
        // GameDataManager.getInstance().getGameData().shopInfo.player.closeAudio = true;
        // GameDataManager.getInstance().getGameData().updateShopInfo();

        




        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        
    }
}