const {ccclass, property} = cc._decorator;

@ccclass
export default class FramePlayer extends cc.Component {

    @property(cc.SpriteAtlas)
    spriteAtlas: cc.SpriteAtlas = null;

    @property
    duration: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        
        cc.repeat(
            cc.delayTime(0.1),
            5
        )
        y = x;
        cc.misc.lerp(0,1,r)
       
    }


    // update (dt) {}
}
