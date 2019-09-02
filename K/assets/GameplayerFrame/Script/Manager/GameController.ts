import { ConfigManager } from "./ConfigManager";
import { PoolManager } from "./PoolManager";
import { ListenerManager } from "./ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { GameDataManager } from "./GameDataManager";
import { UIManager } from "./UIManager";
import { ConstValue } from "../Data/ConstValue";
import { AnimalConfigContainer } from "../../../MergeGame/Common/Script/Config/AnimalConfigContainer";
import { GridConfigContainer } from "../../../MergeGame/Common/Script/Config/GridConfigContainer";
import { AnimalNodePool } from "../../../MergeGame/Common/Script/Pool/AnimalNodePool";
import { GridNodePool } from "../../../MergeGame/Common/Script/Pool/GridNodePool";
import MainUI from "../../../MergeGame/UI/MainUI/MainUI";

export enum GameState {
    NONE,
    IDLE,
    ANIM,
    PUSH,
    PAUSE,
    FISH,
    PULL,
    RESULT
}

export class GameController {
    private static instance: GameController;
    public static getInstance(): GameController {
        if (this.instance == null) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    public gameState: GameState = GameState.IDLE;

    private curLoadedCount: number = 0;
    private sumLoadedCount: number = 4;

    public initGame() {
        this.updateLoadingProgress();
    }

    private updateLoadingProgress() {
        switch (this.curLoadedCount) {
            case 0:
                this.initConfig();
                break;
            case 1:
                this.initPoolNode();
                break;
            case 2:
                this.initGameData();
                break;
            case 3:
                this.initUI();
                break;
            default:
                break;
        }
    }

    private completed() {
        this.curLoadedCount++;
        ListenerManager.getInstance().emit(ListenerType.UpdateLoadingProgress, this.curLoadedCount / this.sumLoadedCount);
        this.updateLoadingProgress();
    }

    private initConfig() {
       

        ConfigManager.getInstance().loadAllConfig(
            () => {
                this.completed();
            },
            AnimalConfigContainer,
            GridConfigContainer,
        );
    }

    private initPoolNode() {
        PoolManager.getInstance().loadAllNodePool(
            () => {
                this.completed();
            },
            AnimalNodePool,
            GridNodePool,
        );
    }

    private initGameData() {
        GameDataManager.getInstance().initData(() => {
            this.completed();
        });
    }

    private initUI() {
        UIManager.getInstance().openUI(MainUI, ConstValue.MAIN_UI_ZINDEX, () => {
            this.completed();
        })
    }
}