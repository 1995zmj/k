import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZObject } from "./Object";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";
import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";

// 这里是争对本地多用户的

class RootViewportLayoutInfo {
    public rootLayout: ZPrimaryGameLayout = null
    public bAddedToViewport: boolean = false
}

export class ZGameUIPolicy implements ZObject {
    private _rootViewLayoutInfo: RootViewportLayoutInfo = null

    public getRootLayout(): ZPrimaryGameLayout {
        return this._rootViewLayoutInfo.rootLayout ? this._rootViewLayoutInfo.rootLayout : null
    }

    public getLayoutWidgetClass() {
        return ZPrimaryGameLayout
    }

    public createLayoutWidget(): ZPrimaryGameLayout {
        let tempClass = this.getLayoutWidgetClass()
        return new tempClass()
    }

    public addView(layout: ZPrimaryGameLayout) {
        let node = layout.rootNode
        cc.director.getScene().getChildByName("Canvas").addChild(node)
    }

    public removeView(layout: ZPrimaryGameLayout) {
        layout.rootNode.removeFromParent()
    }

    public notifyPlayerAdded() {
        if (this._rootViewLayoutInfo) {
            if (!this._rootViewLayoutInfo.bAddedToViewport) {
                this.addView(this._rootViewLayoutInfo.rootLayout)
                this._rootViewLayoutInfo.bAddedToViewport = true
            }
        }
        else {
            this._rootViewLayoutInfo = new RootViewportLayoutInfo()
            this._rootViewLayoutInfo.rootLayout = this.createLayoutWidget()
            this.addView(this._rootViewLayoutInfo.rootLayout)
            this._rootViewLayoutInfo.bAddedToViewport = true
        }
    }

    public notifyPlayerRemoved() {

    }
}