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

    // update(dt: number)
    // {
    //     if(this.delay && this.openUI)
    //     {
    //         UIManager.getInstance().closeUI(LoadingUI);
    //     }

    //     if(this.fake)
    //     {
    //         this.fakeValue += dt * 0.6 / this.fakeTime;
    //         this.updateProgress(this.fakeValue);
    //     }
    // }

    // updateProgress(percent: number)
    // {
    //     if(this.progressBar.progress < percent)
    //     {
    //         this.progressBar.progress = percent;
    //     }
    //     let value = Math.round(this.progressBar.progress * 100);
    //     this.progressLabel.string = value.toString() + '%';
    //     let posX = this.progressBar.progress * 500 - 250;
    //     this.dragonNode.x = posX;
    // }



    load(functionArray: Function[] )
    {
        
    }
}
