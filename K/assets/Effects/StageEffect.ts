
const { ccclass, property } = cc._decorator;

@ccclass
export default class StageEffect extends cc.Component
{
    public _ready: boolean = true;
    public get ready(): boolean
    {
        return this._ready;
    }
    public set ready(value: boolean)
    {
        this._ready = value;
        this.node.active = !value;
    }

    public play(startPosition: cc.Vec2, endPosition: cc.Vec2)
    {
        this.node.stopAllActions();
        this.ready = false;
        this.node.position = startPosition;

        let action0 = cc.moveTo(0.88, endPosition);
        let action1 = cc.delayTime(.4);
        let callback = cc.callFunc(
            function ()
            {
                this.ready = true;
            }
            , this
        );

        let action = cc.sequence(action0, action1, callback);
        this.node.runAction(action);
    }

    public isReady(): boolean
    {
        return this.ready;
    }
}
