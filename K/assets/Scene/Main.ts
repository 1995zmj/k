import { UIManager } from "./GameplayerFrame/Script/Manager/UIManager";
import LoadingUI from "./Script/UI/LoadingUI";
import { ConstValue } from "./GameplayerFrame/Script/Data/ConstValue";
import { GameController } from "./GameplayerFrame/Script/Manager/GameController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad()
    {
        UIManager.getInstance().openUI(LoadingUI,ConstValue.LOADING_UI_ZINDEX,()=>{
            GameController.getInstance().initGame();
        })
    }

    start()
    {

    }
}
