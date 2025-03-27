import { PoolManager } from "./PoolManager";

export interface SpawnData {
    foeType: string;
    total: number;
    spawnInterval: number;
    isCompany: number;
}

// 定义 Spawn 类
export class Spawn {

    private _data: SpawnData = null
    // 构造函数中初始化的属性
    spawned: number = 0;
    finished: boolean = false;

    public setData(data) {
        this._data = data
        this.spawned = 0
        this.finished = false
    }
    // spawn 方法
    public spawn(poolMng: PoolManager): any {
        if (this.spawned >= this._data.total) {
            return;
        }
        let pool = poolMng.requestPool(this._data.foeType);
        if (pool) {
            this.spawned++;
            if (this.spawned === this._data.total) {
                this.finished = true;
            }
            return pool.request();
        } else {
            console.log('max foe count reached, will delay spawn');
            return null;
        }
    }

    public isCompany(): boolean {
        return 1 == this._data.isCompany
    }

    public getTotal(): number {
        return this._data.total
    }
}


