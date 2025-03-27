// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { NodePool } from "./NodePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    testPrefab: cc.Prefab = null;

    @property
    text: string = 'hello';

    public nodePool:NodePool = null
    count = 0
    
    nodes: Array<cc.Node> = []
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    protected onLoad(): void {
        this.nodePool = new NodePool(this.testPrefab, 1)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onDestroy(): void {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    public onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                let node = this.nodePool.request()
                if (node) {
                    this.nodes.push(node)
                    this.count += 1
                    this.node.addChild(node)
                    node.setPosition(cc.v2(0 + this.count * 10, 0))
                }
                break;
            case cc.macro.KEY.s:
                let tempNode = this.nodes.pop()
                this.nodePool.return(tempNode)
                break;
            default:
                break;
        }
    }

    public onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                break;
            default:
                break;
        }
    }

    // update (dt) {}
}
