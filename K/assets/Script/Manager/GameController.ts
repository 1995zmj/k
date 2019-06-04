import { ConfigManager } from "./ConfigManager";

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

    public initGame()
    {
        ConfigManager.getInstance().loadAllConfig()
    }
}