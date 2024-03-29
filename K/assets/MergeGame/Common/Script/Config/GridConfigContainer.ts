import { BaseConfigContainer } from "../../../../GameplayerFrame/Script/Config/BaseConfigContainer";
import { ConstValue } from "../../../../GameplayerFrame/Script/Data/ConstValue";

export class GridData
{
    id: number;
    x: number;
    y: number;
}

export class gridConfigData
{
    [key:number] : GridData
}

export class GridConfigContainer extends BaseConfigContainer
{
    private gridConfigData: gridConfigData = {};

    constructor(callback: Function, caller: any, arg: any)
    {
        super();
        cc.loader.loadRes(ConstValue.CONFIG_FILE_DIR + "Grid", (err, object) =>
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
                    this.gridConfigData[i] = object[i];
                }
                if (callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    getGridConfigData(): gridConfigData
    {
        return this.gridConfigData;
    }

    getPosition(id:number):cc.Vec2
    {
        return cc.v2(this.gridConfigData[id].x,this.gridConfigData[id].y);
    }
}