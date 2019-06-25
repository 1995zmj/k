import { GameDataManager } from "../Manager/GameDataManager";

//数组要自己更新

export interface testD
{
    id:number;
    name:string;
}

export class PlayerInfo
{
    public static className = "PlayerInfo";

    constructor(){
        // this._auiArray = new A()[50];
        // for (var i = 0; i < 50; i++){
        //     var a: A = new A();
        //     this._arrayA.push(a);
        // }
    }

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


    private _testArray: number[] = [];
    public get testArray(): number[]
    {
        return this._testArray;
    }
    public set testArray(value: number[])
    {
        this._testArray = value;
        GameDataManager.getInstance().getGameData().updatePlayerInfo("_testArray");
    }

    initData(data: object)
    {

        // data = Object.assign({
        //     title: 'Foo',
        //     body: 'Bar',
        //     buttonText: 'Baz',
        //     cancellable: true
        //   }, data);
        cc.log(data);
        cc.log(this);
        for (const key in data) {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                let element = data[key];
                if(key == "_auiArray")
                {
                    // this.init_auiArray(element);
                }
                else
                {
                    this[key] = element;
                }
            }
        }
    }


    // init_auiArray(data:[])
    // {
    //     cc.log("zmj",data);
    //     for (const key in data) {
    //         if (data.hasOwnProperty(key)) {
    //             const element = data[key];
    //             let unitInfo = new UnitInfo(data[key]);
    //             this.auiArray.push(unitInfo);
    //         }
    //     }
    // }
}