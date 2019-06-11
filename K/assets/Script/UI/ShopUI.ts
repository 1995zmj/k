import { BaseUI } from "./BaseUI";
import { UIManager } from "../Manager/UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopUI extends BaseUI {
    protected static className = "ShopUI";

    //------ 按钮点击事件 ------//
    onBtnClose()
    {
        UIManager.getInstance().closeUI(ShopUI);
    }
}
