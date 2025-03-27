import { NodePool } from './NodePool';

export class PoolManager {
    public pools: Map<string, NodePool> = new Map();

    public registerPool(key: string, prefab: cc.Prefab, size: number) {
        let tempPool = new NodePool(prefab, size)
        this.pools.set(key, tempPool)
        return tempPool
    }

    public requestPool(key: string) {
        return this.pools.get(key)
    }

    public clear(){
        this.pools.forEach((value:NodePool, key) => {
            value.reset()
        });
        this.pools.clear()
    }
}