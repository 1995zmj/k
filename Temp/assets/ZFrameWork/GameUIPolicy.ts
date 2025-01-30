import { AssetSubsystem } from "./AssetSubsystem";
import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonActivatableWidgetContainerBase } from "./CommonActivatableWidgetContainerBase";
import { GameInstance } from "./GameInstance";
import { ZGameplayTag } from "./GameplayTag";
import { ZClass, ZObject } from "./Object";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";

// 这里是争对本地多用户的

class RootViewportLayoutInfo {
    public rootLayout: ZPrimaryGameLayout = null
    public bAddedToViewport: boolean = false
}

export class ZGameUIPolicy extends ZObject {
    private _layoutClass
    private _rootViewLayoutInfo: RootViewportLayoutInfo = null

    public getLayoutWidgetClass() {
        return ZPrimaryGameLayout
    }

     public createLayoutWidget() {
        GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(ZPrimaryGameLayout.prefabPath)
        
        return new ZPrimaryGameLayout()
        //  这个加到场景下面
    }

    public addView(layout: ZPrimaryGameLayout){
        let node = layout.node
        cc.director.getScene().addChild(node)
    }

    public notifyPlayerAdded() {
        if (this._rootViewLayoutInfo) {
            if (!this._rootViewLayoutInfo.bAddedToViewport) {
                console.log('sss')
                // this._rootViewLayoutInfo.rootLayout.remove()
            }
            // 
        }
        else {
            let temp = new RootViewportLayoutInfo()
            temp.rootLayout = this.createLayoutWidget()
            this.addView(temp.rootLayout)
            this._rootViewLayoutInfo = temp
        }
        // if this._rootLayout
        // let newLayout = new ZPrimaryGameLayout()
        // //  这个加到场景下面
    }

    public notifyPlayerRemoved() {
        // let newLayout = new ZPrimaryGameLayout()
        // //  这个加到场景下面
    }
}