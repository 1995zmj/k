import { ConfigManager } from "./ConfigManager";
import { PoolManager } from "./PoolManager";
import { GameDataManager } from "./GameDataManager";
import { ListenerManager } from "./ListenerManager";
import { ListenerType } from "../Data/ListenerType";

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
        ConfigManager.getInstance().loadAllConfig(()=>{
            this.curLoadedCount ++;
            ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress,this.curLoadedCount/this.sumLoadedCount);
        });
        PoolManager.getInstance().loadAllNodePool(()=>{
            this.curLoadedCount ++;
            ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress,this.curLoadedCount/this.sumLoadedCount);
        });
        GameDataManager.getInstance().getGameData().initPlayerInfo();
        GameDataManager.getInstance().getGameData().initShopInfo();
    }
}