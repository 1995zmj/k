import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";

export class ZCommonActivatableWidgetContainerBase extends ZCommonUserWidget {
    private _widgets: Map<CommonUserWidgetClass<ZCommonActivatableWidget>, ZCommonActivatableWidget>

    constructor(tag: string) {
        super(null)
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

    public addWidget<T extends ZCommonActivatableWidget>(widgetClass: CommonUserWidgetClass<T>) {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).createWidget(widgetClass, (tempLayout) => {
            this._rootNode.addChild(tempLayout.rootNode)
            this._widgets.set(widgetClass, tempLayout)
        })
    }

    public removeWidget(widget: ZCommonActivatableWidget) {
        widget.rootNode.removeFromParent()
        let tempWdigetClass = widget.constructor as CommonUserWidgetClass<ZCommonActivatableWidget>
        this._widgets.delete(tempWdigetClass)
    }
}