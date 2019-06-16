import { ConstValue } from "../Data/ConstValue";
import { BaseNodePool } from "./BaseNodePool";
import Grid from "../Object/Grid";

export class GridNodePool extends BaseNodePool
{
    private gridPrefab: cc.Node = null;
    private gridNodePool: cc.NodePool = null;

    constructor(size: number, callback: Function, caller: any, arg: any)
    {
        super();
        this.gridNodePool = new cc.NodePool(Grid);
        cc.loader.loadRes(ConstValue.PREFAB_POOL_DIR + "Grid", (err, object) =>
        {
            if (err)
            {
                cc.log("load Grid err");
                cc.log(err);
            }
            else
            {
                this.gridPrefab = object;
                for (let index = 0; index < size; index++)
                {
                    let node = cc.instantiate(this.gridPrefab);
                    this.gridNodePool.put(node);
                }

                if (callback)
                {
                    callback.call(caller, arg);
                }
            }
        }
        );
    }

    get()
    {
        if(this.gridNodePool.size() > 0){
            return this.gridNodePool.get();
        }else{
            let node = cc.instantiate(this.gridPrefab);
            return node;
        }
    }

    put(node:cc.Node)
    {
        
    }
}