import { BaseUI } from "../../../GameplayerFrame/Script/UI/BaseUI";
import { ListenerManager } from "../../../GameplayerFrame/Script/Manager/ListenerManager";
import { ListenerType } from "../../../GameplayerFrame/Script/Data/ListenerType";
import { TimeManager } from "../../../GameplayerFrame/Script/Manager/TimeManager";
import { GameDataManager } from "../../../GameplayerFrame/Script/Manager/GameDataManager";
import { UIManager } from "../../../GameplayerFrame/Script/Manager/UIManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopUI extends BaseUI {
    protected static className = "ShopUI";

    @property(cc.Label)
    timeLabel: cc.Label = null;

    onLoad() {
        ListenerManager.getInstance().on(ListenerType.UpdateShopTimeUI, this.updateTimeLabel, this);
    }

    onEnable()
    {

    }

    onDisable()
    {

    }

    updateTimeLabel() {
        let time = TimeManager.getInstance().getTimeByHMS(Math.floor(GameDataManager.getInstance().getGameData().evenTimeCD));
        this.timeLabel.string = time;
    }

    //------ 按钮点击事件 ------//
    onBtnClose() {
        UIManager.getInstance().hideUI(ShopUI);
    }

    onBtnchangeZIndex()
    {
        this.node.zIndex = 70;
    }


}
