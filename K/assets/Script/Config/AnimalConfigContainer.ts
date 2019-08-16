import { BaseConfigContainer } from "../../GameplayerFrame/Script/Config/BaseConfigContainer";
import { ConstValue } from "../../GameplayerFrame/Script/Data/ConstValue";


export class AnimalData
{
    id: number;
    price: number;
    name: string;
}

export class AnimalConfigContainer extends BaseConfigContainer
{
    private animalConfigData: AnimalData[] = [];

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "AnimalConfig", (err, object) =>
        {
            if (err)
            {
                cc.log("load AnimalConfig.json err");
                cc.log(err);
            }
            else
            {
                object = object.json;
                for (var i in object)
                {
                    this.animalConfigData[i] = object[i];
                }
                if (callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    getAnimalConfigData(): AnimalData[]
    {
        return this.animalConfigData;
    }
}