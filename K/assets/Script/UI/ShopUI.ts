import { BaseUI } from "./BaseUI";
import { UIManager } from "../Manager/UIManager";
import { TimeManager } from "../Manager/TimeManager";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import { GameDataManager } from "../Manager/GameDataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopUI extends BaseUI {
    protected static className = "ShopUI";

    @property(cc.Label)
    timeLabel: cc.Label = null;

    onLoad() {
        ListenerManager.getInstance().on(ListenerType.UpdateShopTimeUI, this.updateTimeLabel, this);
    }

    // onEnable()
    // {
    //     this.calculagraph()
    // }

    // calculagraph()
    // {
    //     this.schedule(this.updateTimeLabel, 1);
    // }

    updateTimeLabel() {
        let time = TimeManager.getInstance().getTimeByHMS(Math.floor(GameDataManager.getInstance().getGameData().evenTimeCD));
        this.timeLabel.string = time;
    }

    //------ 按钮点击事件 ------//
    onBtnClose() {
        UIManager.getInstance().closeUI(ShopUI);
    }


}
