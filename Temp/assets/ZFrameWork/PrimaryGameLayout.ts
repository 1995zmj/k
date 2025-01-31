import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonActivatableWidgetContainerBase } from "./CommonActivatableWidgetContainerBase";
import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass } from "./Object";

export class ZPrimaryGameLayout extends ZCommonUserWidget {
    private _layers: Map<string, ZCommonActivatableWidgetContainerBase>;

    constructor() {
        super(null);
        this._rootNode = new cc.Node()
        this._rootNode.name = 'MMM'
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
        let debugNode = this.createDebguNode()
        this._rootNode.addChild(debugNode)
        this._layers = new Map()
        this.registerLayer('T1')
    }

    public static getPrimaryGameLayout(): ZPrimaryGameLayout{
        return GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout()
    }

    private createDebguNode(){
        let tempNode = new cc.Node()
        tempNode.name = 'debugNode'
        let tempComp = tempNode.addComponent(cc.Widget)
        tempComp.isAlignTop = true
        tempComp.top = 0
        tempComp.isAlignLeft = true
        tempComp.left = 0
        return tempNode
    }

    private registerLayer(layerTag: string) {
        let tempContainer = new ZCommonActivatableWidgetContainerBase(layerTag)
        this._rootNode.addChild(tempContainer.rootNode)
        this._layers.set(layerTag, tempContainer)
    }

    public getLayer(layerName: string): ZCommonActivatableWidgetContainerBase {
        return this._layers.get(layerName)
    }

    public pushWidgetToLayerStackAsync<T extends ZCommonActivatableWidget>(layerName: string, activatableWidgetClass: CommonUserWidgetClass<T>): void {
        let layer = this.getLayer(layerName)
        layer.addWidget(activatableWidgetClass)
    }

    public findAndRemoveWidgetFromLayer(wdiget: ZCommonActivatableWidget){
        this._layers.forEach((value, key) => {
            value.removeWidget(wdiget)
        });
    }

}