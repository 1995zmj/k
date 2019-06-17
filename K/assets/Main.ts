import { ConfigManager } from "./Script/Manager/ConfigManager";
import { GameDataManager } from "./Script/Manager/GameDataManager";
import { PoolManager } from "./Script/Manager/PoolManager";
import { UIManager } from "./Script/Manager/UIManager";
import MainUI from "./Script/UI/MainUI";
import ShopUI from "./Script/UI/ShopUI";
import LoadingUI from "./Script/UI/LoadingUI";
import { ListenerManager } from "./Script/Manager/ListenerManager";
import { ListenerType } from "./Script/Data/ListenerType";
import { GameController } from "./Script/Manager/GameController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    value: cc.ValueType = null
    onLoad()
    {
        

        UIManager.getInstance().openUI(LoadingUI,100,()=>{
            GameController.getInstance().initGame();
        })
    }

    start()
    {
        // cc.misc.le
        
    }

    // send()
    // {
    // }

    // destroyUI()
    // {
    //     UIManager.getInstance().hideUI(LoadingUI);
    // }

    // test

    


}
