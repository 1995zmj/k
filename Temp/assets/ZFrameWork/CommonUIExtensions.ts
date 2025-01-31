import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { CommonUserWidgetClass } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";



export class CommonUIExtensions {

    public static pushContentToLayer<T extends ZCommonActivatableWidget>(layerName: string, widgetClass: CommonUserWidgetClass<T>): void {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout().pushWidgetToLayerStackAsync(layerName, widgetClass)
    }

    public static PopContentFromLayer(widget: ZCommonActivatableWidget): void {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout().findAndRemoveWidgetFromLayer(widget)
    }
}


