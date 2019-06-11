//只支持对象的第一层级的key
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

    setObjData(objName: string, obj: object, propertyKey?: string)
    {
        if (propertyKey)
        {
            if (obj.hasOwnProperty(propertyKey))
            {
                const element = obj[propertyKey];
                this.setLocalData(objName + propertyKey, element);
            }
        } else
        {
            let object = obj;
            for (const key in object)
            {
                if (object.hasOwnProperty(key))
                {
                    const element = object[key];
                    this.setLocalData(objName + key, element);
                }
            }
        }
    };

    initObjData(objName: string, obj: object)
    {
        let object = obj;
        for (const key in object)
        {
            if (object.hasOwnProperty(key))
            {
                const element = object[key];
                let localData = this.getLocalData(objName+key,element);
                object[key] = localData;
            }
        }
    };

    setLocalData(key:string, data:any)
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