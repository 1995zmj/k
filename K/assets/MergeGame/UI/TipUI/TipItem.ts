const { ccclass, property } = cc._decorator;

@ccclass
export class Tip extends cc.Component
{
    @property(cc.Label)
    private tipLabel: cc.Label = null;

    public playTip(message: string)
    {
        this.tipLabel.string = message;

        this.node.opacity = 0;
        this.node.scale = 1;

        this.node.stopAllActions();
        let action0 = cc.scaleTo(0.2, 1.2);
        let action1 = cc.fadeIn(0.2);
        let action2 = cc.spawn(action0, action1);
        let action3 = cc.delayTime(0.3);
        let action4 = cc.fadeOut(0.2);
        let action5 = cc.scaleTo(0.2, 1);
        let action6 = cc.spawn(action4, action5);

        let action = cc.sequence(action2, action3, action6);
        this.node.runAction(action);
    }
}