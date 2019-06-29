import Pawn from "./Pawn";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Character extends Pawn {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
