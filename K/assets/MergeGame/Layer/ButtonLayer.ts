import { GameDataManager } from "../../GameplayerFrame/Script/Manager/GameDataManager";
import { UIManager } from "../../GameplayerFrame/Script/Manager/UIManager";
import ShopUI from "../UI/ShopUI/ShopUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonLayer extends cc.Component
{
    onBtnBuy()
    {
        GameDataManager.getInstance().getGameData().buyAnimal(2);
    }

    onBtnShopU()
    {
        UIManager.getInstance().showUI(ShopUI);
    }


    onBtnSet()
    {
        GameDataManager.getInstance().getGameData().updateShopInfo();
    }

    onBtnGet()
    {

        var time = 40;
        console.log((Array(2).join("0") + time).slice(-2));

        GameDataManager.getInstance().getGameData().initShopInfo();
        cc.log(GameDataManager.getInstance().getGameData().shopInfo);
    }
}
