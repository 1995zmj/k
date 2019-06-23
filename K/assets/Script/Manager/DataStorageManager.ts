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

    data: object={};

    setObjData(objName: string, obj: object, propertyKey?: string)
    {
        this.setLocalData(objName, obj);

        // if (propertyKey)
        // {
        //     if (obj.hasOwnProperty(propertyKey))
        //     {
        //         const element = obj[propertyKey];
        //         this.setLocalData(objName + propertyKey, element);
        //     }
        // } 
        // else
        // {
        //     let object = obj;
        //     for (const key in object)
        //     {
        //         if (object.hasOwnProperty(key))
        //         {
        //             const element = object[key];
        //             cc.log("k", key, element);

        //             if (typeof element == "object")
        //             {
        //                 cc.log(element.constructor.name)

        //                 if (element.constructor.name == "Array")
        //                 {
        //                     for (let index = 0; index < element.length; index++)
        //                     {
        //                         const tempElement = element[index];
        //                         if (typeof element == "object")
        //                             this.setObjData(objName + key + index.toString(), tempElement);
        //                         else
        //                             this.setLocalData(objName + key, element);

        //                     }
        //                 }
        //                 else
        //                 {
        //                     this.setObjData(objName + key, element);
        //                 }
        //             } 
        //             else
        //             {
        //                 this.setLocalData(objName + key, element);
        //             }

        //             this.setLocalData(objName + key, element);
        //         }
        //     }
        // }
    };


    initObjData(objName: string, obj: info)
    {
        // let object = obj;
        // for (const key in object)
        // {
        //     if (object.hasOwnProperty(key))
        //     {
        //         const element = object[key];

        //         // 数组 对象
        //         if (typeof element == "object")
        //         {
        //             // 数组
        //             if (element.constructor.name == "Array")
        //             {
        //                 for (let index = 0; index < element.length; index++)
        //                 {
        //                     const tempElement = element[index];
        //                     if (typeof element == "object"){
        //                         this.initObjData(objName + key + index.toString(), tempElement,);
        //                     }
        //                     else
        //                     {
        //                         this.data[key] = this.getLocalData(objName + key, element);
        //                         break;
        //                     }
        //                 }
        //             }
        //             // 对象
        //             else
        //             {
        //                 this.initObjData(objName + key, element);
        //             }
        //         } 
        //         else//简单类型
        //         {
        //             data[key] = this.getLocalData(objName+key,element);
        //         }
                
        //     }
        // }
        
        obj.initData(this.getLocalData(objName,obj));
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