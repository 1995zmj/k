export class PlayerInfo
{
    public static className = "PlayerInfo";

    constructor(storageKey?: string)
    {
        this.storageKey = storageKey;
    }

    public storageKey: string = null;

    private _firstLogin: boolean = true;
    public get firstLogin(): boolean
    {
        return this._firstLogin;
    }
    public set firstLogin(value: boolean)
    {
        this._firstLogin = value;
    }

    private _closeAudio: boolean = false;
    public get closeAudio(): boolean
    {
        return this._closeAudio;
    }
    public set closeAudio(value: boolean)
    {
        this._closeAudio = value;
    }

    private _closeBgm: boolean = false;
    public get closeBgm(): boolean
    {
        return this._closeBgm;
    }
    public set closeBgm(value: boolean)
    {
        this._closeBgm = value;
    }

    // private _saveEvenTime: number = 0;
    // public get saveEvenTime(): number
    // {
    //     return this._saveEvenTime;
    // }
    // public set saveEvenTime(value: number)
    // {
    //     this._saveEvenTime = value;
    // }

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
        for (const key in data)
        {
            if (this.hasOwnProperty(key) && data.hasOwnProperty(key))
            {
                let element = data[key];
                this[key] = element;
            }
        }
    }
}