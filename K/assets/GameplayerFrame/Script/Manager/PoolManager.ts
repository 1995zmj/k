import { BaseConfigContainer, ConfigContainerClass } from "../Config/BaseConfigContainer";
import { BaseNodePool, NodePoolClass } from "../Pool/BaseNodePool";

export class PoolManager {
    private static instance: PoolManager;

    private nodePoolList: BaseNodePool[] = [];
    private curLoadedCount: number = 0;

    public static getInstance(): PoolManager {
        if (this.instance == null) {
            this.instance = new PoolManager();
        }
        return this.instance;
    }

    public loadAllNodePool(callback?: Function, ...nodePoolClasss: {new (callback: Function, caller: any, arg: any): BaseNodePool}[]): void {
        cc.log(nodePoolClasss);
        for (let index = 0; index < nodePoolClasss.length; index++) {
            this.loadNodePool(nodePoolClasss[index], this.callback, callback);
        }
    }

    public getNodePool<T extends BaseNodePool>(configClass: NodePoolClass<T>): BaseNodePool {
        for (let i = 0; i < this.nodePoolList.length; ++i) {
            if (this.nodePoolList[i].tag == configClass) {
                return this.nodePoolList[i];
            }
        }
        return null;
    }

    public loadNodePool<T extends BaseNodePool>(nodePoolClass: NodePoolClass<T>, callback: Function, arg: any) {
        let nodePool = new nodePoolClass(callback, this, arg);
        nodePool.tag = nodePoolClass;
        this.nodePoolList.push(nodePool);
    }

    private callback(callback: Function) {
        this.curLoadedCount += 1;
        if (this.nodePoolList.length == this.curLoadedCount) {
            if (callback) {
                cc.log(this.nodePoolList);
                callback();
            }
        }
    }
}