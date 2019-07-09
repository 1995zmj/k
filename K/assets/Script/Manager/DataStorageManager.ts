export interface info
{
    initData(data: object);
}


export class DataStorageManager
{
    private static instance: DataStorageManager;


    static getInstance(): DataStorageManager
    {
        if (this.instance == null)
        {
            this.instance = new DataStorageManager();
        }
        return this.instance;
    }
    
    setObjData(storageKey: string, obj: object, propertyKey?: string)
    {
        let object = obj;
        for (const key in object)
        {
            if (object.hasOwnProperty(key))
            {
                const element = object[key];
                cc.log("k", key, element);

                if (key == "storageKey")
                {
                    continue;
                }

                if (typeof element == "object")
                {
                    cc.log(element.constructor.name)
                    if (element.storageKey)
                    {
                        this.setObjData(element.storageKey, element);
                    }
                    else
                    {
                        this.setLocalData(storageKey + key, element);
                    }
                }
                else
                {
                    this.setLocalData(storageKey + key, element);
                }
            }
        }
    };


    getDataFromLocalData(storageKey: string, obj: info)
    {
        let data = {};
        this.initObjData(storageKey, obj, data);
        cc.log(data);
        return data;
    }


    initObjData(storageKey: string, obj: info, data: object)
    {
        let object = obj;
        for (const key in object)
        {
            if (object.hasOwnProperty(key))
            {
                const element = object[key];
                if (key == "storageKey")
                {
                    continue;
                }

                cc.log("k", key, element);

                if (typeof element == "object")
                {
                    if (element.storageKey)
                    {
                        data[key] = {};
                        this.initObjData(element.storageKey, element, data[key]);
                    }
                    else
                    {
                        data[key] = this.getLocalData(storageKey + key, element);
                    }
                }
                else
                {
                    data[key] = this.getLocalData(storageKey + key, element);
                }

            }
        }
    };

    setLocalData(key: string, data: any)
    {
        let tempData = data;
        if (typeof data == 'object')
        {
            tempData = JSON.stringify(data);
        }

        this.setlocalStorage(key, tempData);
    }

    getLocalData(key, defaultData)
    {

        let value = this.getlocalStorage(key, defaultData);
        if (typeof defaultData == 'boolean')
        {
            value = this.toBoolean(value, defaultData);
        }
        else if (typeof defaultData == 'number')
        {
            value = this.toNumber(value, defaultData);
        }
        else if (typeof defaultData == 'object')
        {
            value = this.toJSON(value, defaultData);
        }
        return value;
    }


    toBoolean(src, def)
    {
        if (typeof src == 'boolean')
        {
            return src;
        }
        else if (src == null || src == "")
        {
            return def;
        }
        else if (src == "false")
        {
            return false;
        }
        else if (src == "true")
        {
            return true;
        }
    };

    toNumber(src, def)
    {
        var res = Number(src);
        if (isNaN(res))
        {
            return def;
        }
        else
        {
            return res;
        }
    };

    toJSON(src, def)
    {
        var res;
        try
        {
            res = JSON.parse(src);
            if (typeof res == 'object' && res)
            {
                return res;
            } else
            {
                return def;
            }

        }
        catch (e)
        {
            return def;
        }
    };


    setlocalStorage(key: string, data: any)
    {
        if (typeof data == 'object')
        {
            data = JSON.stringify(data);
        }
        cc.sys.localStorage.setItem(key, data);
    };

    getlocalStorage(key: string, defaultData: any)
    {
        var res = cc.sys.localStorage.getItem(key);
        if ((res == null || res == "null") && defaultData != null)
        {
            res = defaultData;
        }
        return res;
    };

}