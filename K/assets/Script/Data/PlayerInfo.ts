import { GameDataManager } from "../Manager/GameDataManager";

//数组要自己更新

export class PlayerInfo
{
    public static className = "PlayerInfo";

    private _firstLogin: boolean = true;
    public get firstLogin(): boolean
    {
        return this._firstLogin;
    }
    public set firstLogin(value: boolean)
    {
        this._firstLogin = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo("_firstLogin");
    }

    private _closeAudio: boolean = false;
    public get closeAudio(): boolean
    {
        return this._closeAudio;
    }
    public set closeAudio(value: boolean)
    {
        this._closeAudio = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo("_closeAudio");
    }

    private _closeBgm: boolean = false;
    public get closeBgm(): boolean
    {
        return this._closeBgm;
    }
    public set closeBgm(value: boolean)
    {
        this._closeBgm = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo("_closeBgm");
    }

    private _saveEvenTime: number = 0;
    public get saveEvenTime(): number
    {
        return this._saveEvenTime;
    }
    public set saveEvenTime(value: number)
    {
        this._saveEvenTime = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo("_saveEvenTime");
    }
}