import { BaseUI } from "./BaseUI";
import { UIManager } from "../Manager/UIManager";
import { TimeManager } from "../Manager/TimeManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopUI extends BaseUI
{
    protected static className = "ShopUI";

    @property(cc.Label)
    timeLabel: cc.Label = null;

    cdTime: number = 10;
    countDownId: number = 0;

    onEnable()
    {
        this.calculagraph()
    }

    calculagraph()
    {
        this.schedule(this.updateTimeLabel, 1);
    }

    updateTimeLabel()
    {
        this.timeLabel.string = this.cdTime.toString();
        this.cdTime--;
        if(this.cdTime < 0){
            // this.unschedule(this.updateTimeLabel);
            this.cdTime = 10;

        }
    }


    //------ 按钮点击事件 ------//
    onBtnClose()
    {
        UIManager.getInstance().closeUI(ShopUI);
    }


}
