import { ConfigManager } from "./ConfigManager";
import { PoolManager } from "./PoolManager";
import { GameDataManager } from "./GameDataManager";
import { ListenerManager } from "./ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { UnitInfo } from "../Data/WarPlatformInfo";
import { DataStorageManager } from "./DataStorageManager";

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
            // this.curLoadedCount++;
            // ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress, this.curLoadedCount / this.sumLoadedCount);
        });
        let gameData = GameDataManager.getInstance().getGameData();

        // gameData.playerInfo.testArray = [2,2,2];
        // let t = new UnitInfo();
        // cc.log(t);  
        // let k = new UnitInfo();
        // k._unitInfoId = 1;
        // gameData.playerInfo.auiArray.push(new UnitInfo());
        // gameData.playerInfo.auiArray.push(k);
        // gameData.playerInfo.auiArray.push(new UnitInfo());
        // GameDataManager.getInstance().getGameData().updatePlayerInfo();
        GameDataManager.getInstance().getGameData().initPlayerInfo();
        cc.log(gameData.playerInfo);
        
        
        // GameDataManager.getInstance().getGameData().calculateOfflineTime();
    }
}