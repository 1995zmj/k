import { UIManager } from "./Script/Manager/UIManager";
import LoadingUI from "./Script/UI/LoadingUI";
import { ListenerManager } from "./Script/Manager/ListenerManager";
import { AudioManager } from "./Script/Manager/AudioManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    onLoad()
    {
        UIManager.getInstance().openUI(LoadingUI,-1);
        ListenerManager.getInstance().on("a1",()=>{
            cc.log("a1");
        },this);


        ListenerManager.getInstance().on("a2",()=>{
            cc.log("a2");
        },this);
    }

    send()
    {
        ListenerManager.getInstance().emit("a1");
        ListenerManager.getInstance().emit("a2");
        ListenerManager.getInstance().emit("a3");
        ListenerManager.getInstance().emit("a4");
    }

    destroyUI()
    {
        UIManager.getInstance().hideUI(LoadingUI);
    }

}
