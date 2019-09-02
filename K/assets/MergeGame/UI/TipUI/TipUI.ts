import { BaseUI } from "../../../GameplayerFrame/Script/UI/BaseUI";
import { Tip } from "./TipItem";

const {ccclass, property} = cc._decorator;

@ccclass
export class TipUI extends BaseUI {

    protected static className = "TipUI";
    @property(cc.Node)
    private tipNode: cc.Node = null;

    showTip(message: string)
    {
        let tip = this.tipNode.getComponent(Tip);
        tip.playTip(message);
    }
}