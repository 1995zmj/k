import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonActivatableWidgetContainerBase } from "./CommonActivatableWidgetContainerBase";
import { ZGameplayTag } from "./GameplayTag";
import { ZClass, ZObject } from "./Object";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";

// 这里是争对本地多用户的

class RootViewportLayoutInfo {
    public rootLayout: ZPrimaryGameLayout
    public bAddedToViewport: boolean
}

export class ZGameUIPolicy extends ZObject {
    private _layoutClass
    private _rootViewLayoutInfo: RootViewportLayoutInfo

    public getLayoutWidgetClass(){
        return ZPrimaryGameLayout
    }

    public createLayoutWidget(){
        let newLayout = new ZPrimaryGameLayout()
        //  这个加到场景下面
    }

    public notifyPlayerAdded(){
        // if this._rootLayout
        // let newLayout = new ZPrimaryGameLayout()
        // //  这个加到场景下面
    }

    public notifyPlayerRemoved(){
        // let newLayout = new ZPrimaryGameLayout()
        // //  这个加到场景下面
    }
}