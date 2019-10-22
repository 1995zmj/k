const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    pool: cc.NodePool = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pool =  new cc.NodePool();
        for (let index = 0; index < 3; index++) {
            this.pool.put(cc.instantiate(this.prefab));
        }
    }

    start () {

    }

    // update (dt) {}
}
