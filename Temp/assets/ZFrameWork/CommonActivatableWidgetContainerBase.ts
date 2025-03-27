import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonUserWidget, ZCommonUserWidgetClass } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass, ZObject } from "./Object";

export class ZCommonActivatableWidgetContainerBase extends ZCommonUserWidget {
    private _widgets: Map<ZClass<ZCommonActivatableWidget>, ZCommonActivatableWidget>

    constructor(tag: string) {
        super()
        this._rootNode = new cc.Node()
        this._rootNode.name = 'N_' + tag
        this._rootNode.addComponent(cc.Widget)
        let tempComp = this._rootNode.getComponent(cc.Widget)
        tempComp.isAlignTop = true
        tempComp.top = 0
        tempComp.isAlignBottom = true
        tempComp.bottom = 0
        tempComp.isAlignLeft = true
        tempComp.left = 0
        tempComp.isAlignRight = true
        tempComp.right = 0

        this._widgets = new Map()
    }

    public onDestroy(): void {
        this.removeAllWidget()
        this._rootNode.removeFromParent()
        this._rootNode = null
        super.onDestroy()
    }

    public addWidget<T extends ZCommonActivatableWidget>(widgetClass: ZClass<T>) {
        let tempWidgetClass = widgetClass as ZCommonUserWidgetClass<T>
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).createWidget(tempWidgetClass, (tempLayout) => {
            this._rootNode.addChild(tempLayout.rootNode)
            this._widgets.set(widgetClass, tempLayout)
        })
    }

    public removeWidget(widget: ZCommonActivatableWidget) {
        widget.rootNode.removeFromParent()
        let tempWdigetClass = widget.constructor as ZClass<ZCommonActivatableWidget>
        this._widgets.delete(tempWdigetClass)
    }

    public removeAllWidget() {
        this._widgets.forEach((value, key) => {
            ZObject.destroy(value)
        });
        this._widgets.clear()
    }
}