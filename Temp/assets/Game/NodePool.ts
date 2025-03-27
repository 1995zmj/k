export class NodePool {
    private _prefab: cc.Prefab = null;
    private _size: number = 0;
    private _pool: cc.NodePool = null;

    constructor(prefab: cc.Prefab, size: number) {
        this._prefab = prefab
        this._size = size
        this._pool = new cc.NodePool()
        
        for (let i = 0; i < this._size; ++i) {
            if (this._prefab) {
                let node = cc.instantiate(this._prefab);
                this._pool.put(node)
            }
        }
    }

    public reset() {
        this._size = 0
        this._prefab = null
        this._pool.clear()
    }

    public request(): cc.Node {
        if (this._pool.size() > 0) {
            return this._pool.get()
        }
        else {
            console.error('nodepool error')
            return null
        }
    }

    public return(node: cc.Node) {
        this._pool.put(node)
    }
}