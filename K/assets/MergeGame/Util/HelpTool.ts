import { UIManager } from "../../GameplayerFrame/Script/Manager/UIManager";
import { TipUI } from "../UI/TipUI/TipUI";
import { ConstValue } from "../../GameplayerFrame/Script/Data/ConstValue";

export class HelpTool
{
    public static showTip(message: string)
    {
        let tipUI = UIManager.getInstance().getUI(TipUI) as TipUI;
        if(!tipUI)
        {
            UIManager.getInstance().openUI(TipUI, ConstValue.TOP_UI_ZINDEX, ()=>{
                HelpTool.showTip(message);
            });
        }
        else
        {
            tipUI.showTip(message);
        }
    }

    public static onAdsOrShare(callback: Function, type: string)
    {

    }

    static onBtnAds(callback: Function, type: string, err?: Function)
    {

    }

    public static onBtnGem(callback: Function, cost: number, type: string)
    {

    }
}

