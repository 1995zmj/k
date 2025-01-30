import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonActivatableWidgetContainerBase } from "./CommonActivatableWidgetContainerBase";
import { ZCommonUserWidget } from "./CommonUserWidget";
import { ZGameplayTag } from "./GameplayTag";
import { ZClass } from "./Object";

export class ZPrimaryGameLayout extends ZCommonUserWidget {
    private layers: Map<ZGameplayTag, ZCommonActivatableWidgetContainerBase>;
    static prefabPath: string = "ui/P_MainMean_U";
    public registerLayer(layerTag: ZGameplayTag, layerWidget: ZCommonActivatableWidgetContainerBase) {
        this.layers.set(layerTag, layerWidget)
    }

    public getLayerWidget(layerName: ZGameplayTag): ZCommonActivatableWidgetContainerBase {
        return this.layers.get(layerName)
    }

    public pushWidgetToLayerStackAsync<T extends ZCommonActivatableWidget>(layerName: ZGameplayTag, activatableWidgetClass: ZClass<T>, stateFunc: Function): T {
        let activatableWidget = new activatableWidgetClass()
        let layer = this.getLayerWidget(layerName)
        layer.addWidget(activatableWidget)
        return activatableWidget
    }
}