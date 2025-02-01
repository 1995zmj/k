// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class InputComp extends cc.Component {


    @property(cc.Node)
    bottomNode: cc.Node = null

    @property(cc.Node)
    topNode: cc.Node = null

    speed: number = 5
    curDirction: cc.Vec2 = cc.v2(0, 0)
    startTouchPosiotn: cc.Vec2 = cc.v2(0, 0)
    isTouch: boolean = false

    protected onLoad(): void {
        this.bottomNode.active = false
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    protected onDestroy(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    public onTouchStart(event: cc.Event.EventTouch) {
        if (this.isTouch) {
            return
        }
        this.bottomNode.active = true
        this.isTouch = true
        this.startTouchPosiotn = event.getLocation()
        this.bottomNode.setPosition(this.startTouchPosiotn)
    }

    public onTouchMove(event: cc.Event.EventTouch) {
        if (!this.isTouch) {
            return
        }
        let position = event.getLocation()
        let delta = position.subSelf(this.startTouchPosiotn)
        delta = delta.normalize()
        
        this.topNode.setPosition(delta.mulSelf(20))
    }

    public onTouchEnd(event: cc.Event.EventTouch) {
        this.isTouch = false
        this.bottomNode.active = false
    }

}
