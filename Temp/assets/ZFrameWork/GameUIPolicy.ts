import { ZObject } from "./Object";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";

// 这里是争对本地多用户的
class RootViewportLayoutInfo {
    public rootLayout: ZPrimaryGameLayout = null
    public bAddedToViewport: boolean = false
}

export class ZGameUIPolicy extends ZObject {
    private _rootViewLayoutInfo: RootViewportLayoutInfo = null

    public onDestroy(){
        if (this._rootViewLayoutInfo) {
            ZObject.destroy(this._rootViewLayoutInfo.rootLayout)
            this._rootViewLayoutInfo = null
        }
        super.onDestroy()
    }
    
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

    private addView(layout: ZPrimaryGameLayout) {
        let node = layout.rootNode
        cc.director.getScene().getChildByName("Canvas").addChild(node)
    }

    public notifyPlayerAdded() {
        this._rootViewLayoutInfo = new RootViewportLayoutInfo()
        this._rootViewLayoutInfo.rootLayout = this.createLayoutWidget()
        this.addView(this._rootViewLayoutInfo.rootLayout)
    }

    public notifyPlayerRemoved() {
        if (this._rootViewLayoutInfo) {
            ZObject.destroy(this._rootViewLayoutInfo.rootLayout)
            this._rootViewLayoutInfo = null
        }
    }
}