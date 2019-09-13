import { BaseConfigContainer } from "../../../../GameplayerFrame/Script/Config/BaseConfigContainer";
import { ConstValue } from "../../../../GameplayerFrame/Script/Data/ConstValue";

export class AnimalData
{
    price: number;
    name: string;
}

export class AnimalConfigData
{
    [key:number] : AnimalData
}

export class AnimalConfigContainer extends BaseConfigContainer
{

    private animalConfigData: AnimalConfigData = {};

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "Animal", (err, object) =>
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

    getAnimalConfigData(): AnimalConfigData
    {
        return this.animalConfigData;
    }
}