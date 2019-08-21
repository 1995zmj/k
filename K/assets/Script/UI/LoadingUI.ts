import { BaseUI } from "../../GameplayerFrame/Script/UI/BaseUI";
import { ListenerManager } from "../../GameplayerFrame/Script/Manager/ListenerManager";
import { ListenerType } from "../../GameplayerFrame/Script/Data/ListenerType";
import { UIManager } from "../../GameplayerFrame/Script/Manager/UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingUI extends BaseUI
{
    protected static className = "LoadingUI";

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    curProgress: number = 0;
    destProgress: number = 0;
    timer: number = 0;
    isLerping: boolean = false;
    lerpDuration: number = 1;
    isComplete: boolean = false;

    onLoad()
    {
        ListenerManager.getInstance().on(ListenerType.UpdateLoadingProgress, this.updateProgress, this)
    }

    start()
    {
        this.progressBar.progress = 0;
    }

    // called every frame, uncomment this function to activate update callback
    update(dt: number)
    {
        if (this.isLerping === false || this.isComplete === true)
        {
            return;
        }
        this.timer += dt;
        if (this.timer >= this.lerpDuration)
        {
            this.timer = this.lerpDuration;
            this.isLerping = false;
        }
        this.progressBar.progress = cc.misc.lerp(this.curProgress, this.destProgress, this.timer / this.lerpDuration);

        //头的位置
        // let headPosX = this.progressBar.barSprite.node.width * this.progressBar.progress;
        // this.head.x = headPosX;

        if (this.progressBar.progress == 1)
        {
            this.isComplete = true;
            this.completeCallback();
        }
    }

    completeCallback()
    {
        UIManager.getInstance().closeUI(LoadingUI);
    }

    updateProgress(progress: number)
    {
        this.curProgress = this.progressBar.progress;
        this.destProgress = progress;
        this.timer = 0;
        this.isLerping = true;
    }
}
