import { ConstValue } from "../Data/ConstValue";
import { BaseNodePool } from "./BaseNodePool";
import Animal from "../Object/Animal";

export class AnimalNodePool extends BaseNodePool
{
    private animalPrefab: cc.Node = null;
    private animalNodePool: cc.NodePool = null;

    constructor(size: number, callback: Function, caller: any, arg: any)
    {
        super();
        this.animalNodePool = new cc.NodePool(Animal);
        cc.loader.loadRes(ConstValue.PREFAB_POOL_DIR + "Animal", (err, object) =>
        {
            if (err)
            {
                cc.log("load Grid err");
                cc.log(err);
            }
            else
            {
                this.animalPrefab = object;
                for (let index = 0; index < size; index++)
                {
                    let node = cc.instantiate(this.animalPrefab);
                    this.animalNodePool.put(node);
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
        let node = null;
        if(this.animalNodePool.size() > 0){
            node = this.animalNodePool.get();
        }else{
            node = cc.instantiate(this.animalPrefab);
        }
        return node;
    }

    put(node:cc.Node)
    {
        
    }
}