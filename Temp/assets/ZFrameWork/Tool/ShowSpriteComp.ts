// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShowSpriteComp extends cc.Component {

    @property(cc.SpriteAtlas)
    atlas: cc.SpriteAtlas = null

    @property
    interval: number = 0.03

    @property
    startIndex: number = 0

    spriteFrames: any
    private curIndex = 0
    private maxNumber = 0
    start() {
        this.spriteFrames = this.atlas.getSpriteFrames()
        this.maxNumber = this.spriteFrames.length
        this.startIndex = this.startIndex % this.maxNumber
        this.curIndex = this.startIndex
        this.playSprite()
    }

    public playSprite() {
        this.schedule(this.playSpriteLoop, this.interval, cc.macro.REPEAT_FOREVER)
    }

    protected playSpriteLoop() {
        let sprite = this.node.getComponent(cc.Sprite)
        sprite.spriteFrame = this.spriteFrames[this.curIndex]
        this.curIndex += 1
        this.curIndex %= this.maxNumber
    }
}
