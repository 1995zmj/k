import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { GameInstance } from "./GameInstance";
import { RegisterManager } from "./GameManager/RegisterManager";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass } from "./Object";


export class CommonUIExtensions {

    public static pushContentToLayer<T extends ZCommonActivatableWidget>(layerName: string, widgetClass: ZClass<T>): void {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout().pushWidgetToLayerStackAsync(layerName, widgetClass)
    }

    public static pushContentToLayerByName(layerName: string, widgetClassName: string): void {
        let tempClass = RegisterManager.getInstance().getWidgetClassByName<ZCommonActivatableWidget>(widgetClassName)
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout().pushWidgetToLayerStackAsync(layerName, tempClass)
    }

    public static PopContentFromLayer(widget: ZCommonActivatableWidget): void {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout().findAndRemoveWidgetFromLayer(widget)
    }
}


