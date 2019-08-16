import { BaseConfigContainer, ConfigContainerClass } from "../Config/BaseConfigContainer";
import { BaseNodePool, NodePoolClass } from "../Pool/BaseNodePool";
import { GridNodePool } from "../../../Script/Pool/GridNodePool";
import { AnimalNodePool } from "../../../Script/Pool/AnimalNodePool";



export class PoolManager
{
    private static instance: PoolManager;

    private nodePoolList: BaseNodePool[] = [];
    private curLoadedCount: number = 0;

    public static getInstance(): PoolManager
    {
        if (this.instance == null)
        {
            this.instance = new PoolManager();
        }
        return this.instance;
    }

    public loadAllNodePool(callback?: Function): void
    {
        this.loadNodePool(19,GridNodePool, this.callback, callback);
        this.loadNodePool(19,AnimalNodePool, this.callback, callback);
    }

    public getNodePool<T extends BaseNodePool>(configClass: NodePoolClass<T>): BaseNodePool
    {
        for (let i = 0; i < this.nodePoolList.length; ++i)
        {
            if (this.nodePoolList[i].tag == configClass)
            {
                return this.nodePoolList[i];
            }
        }
        return null;
    }

    public loadNodePool<T extends BaseNodePool>(size: number, nodePoolClass: NodePoolClass<T>, callback: Function, arg: any)
    {
        let nodePool = new nodePoolClass(size, callback, this, arg);
        nodePool.tag = nodePoolClass;
        this.nodePoolList.push(nodePool);
    }

    private callback(callback: Function)
    {
        this.curLoadedCount += 1;
        if (this.nodePoolList.length == this.curLoadedCount)
        {
            if (callback)
            {
                callback();
            }
        }
    }
}