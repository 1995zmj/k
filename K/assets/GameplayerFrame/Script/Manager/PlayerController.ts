// TODO
const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {
    onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }
}
