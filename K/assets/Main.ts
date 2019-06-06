import { UIManager } from "./Script/Manager/UIManager";
import LoadingUI from "./Script/UI/LoadingUI";
import { ListenerManager } from "./Script/Manager/ListenerManager";
import { AudioManager } from "./Script/Manager/AudioManager";
import MainUI from "./Script/UI/MainUI";
import { ConfigManager } from "./Script/Manager/ConfigManager";
import { PoolManager } from "./Script/Manager/PoolManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad()
    {
        ConfigManager.getInstance().loadAllConfig();
        PoolManager.getInstance().loadAllNodePool();
    }

    start()
    {
        UIManager.getInstance().openUI(MainUI,-1);
    }

    // send()
    // {
    // }

    // destroyUI()
    // {
    //     UIManager.getInstance().hideUI(LoadingUI);
    // }

}
