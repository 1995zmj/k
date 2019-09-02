const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimHelper extends cc.Component {

    @property(cc.Component.EventHandler)
    finishHandler: cc.Component.EventHandler = null;

    finish() {
        cc.Component.EventHandler.emitEvents([this.finishHandler]);
    }


}
