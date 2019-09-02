import { BaseConfigContainer, ConfigContainerClass } from "../Config/BaseConfigContainer";

export class ConfigManager
{
    private static instance: ConfigManager;

    private configContainerList: BaseConfigContainer[] = [];
    private curLoadedCount: number = 0;

    public static getInstance(): ConfigManager
    {
        if (this.instance == null)
        {
            this.instance = new ConfigManager();
        }
        return this.instance;
    }

    public loadAllConfig(callback: Function, ...configClasss:{new (callback: Function, caller: any, arg: any): BaseConfigContainer}[]): void
    {  
        for (let index = 0; index < configClasss.length; index++) {
            this.loadConfig(configClasss[index], this.callback, callback);
        }
    }

    public getConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>): BaseConfigContainer
    {
        for (let i = 0; i < this.configContainerList.length; ++i)
        {
            if (this.configContainerList[i].tag == configClass)
            {
                return this.configContainerList[i];
            }
        }
        return null;
    }

    public loadConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>, callback: Function, arg: any)
    {
        let config = new configClass(callback, this, arg);
        config.tag = configClass;
        this.configContainerList.push(config);
    }

    private callback(callback: Function)
    {
        this.curLoadedCount += 1;
        if (this.configContainerList.length == this.curLoadedCount)
        {
            if (callback)
            {
                callback();
            }
        }
    }
}