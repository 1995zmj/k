import { BaseUI } from "./BaseUI";
import { ListenerManager } from "../Manager/ListenerManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingUI extends BaseUI {
    protected static className = "LoadingUI";

    start()
    {
        ListenerManager.getInstance().on("a3",()=>{
            cc.log("a3");
        },this);
        ListenerManager.getInstance().on("a4",()=>{
            cc.log("a4");
        },this);

    }
}
