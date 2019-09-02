const {ccclass, property} = cc._decorator;

@ccclass
export default class CharacterAnimation extends cc.Component {
    animation: cc.Animation = null;


    stand()
    {
        this.animation.play("Y_Stand");
    }

}
