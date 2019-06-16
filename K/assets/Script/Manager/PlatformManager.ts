const {ccclass, property} = cc._decorator;

export enum EPlatform
{
    none = "",
    h5 = "h5",
    android = "android",
    ios = "ios",
}

@ccclass
export class PlatformManager
{
    platform: EPlatform = EPlatform.android;

    private static instance: PlatformManager = null;

    public static getInstance(): PlatformManager
    {
        if(this.instance == null)
        {
            this.instance = new PlatformManager();
        }
        return this.instance;
    }
}