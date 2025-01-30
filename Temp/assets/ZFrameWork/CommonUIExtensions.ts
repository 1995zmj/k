import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";



export class CommonUIExtensions {

    public static pushContentToLayer<T extends ZCommonUserWidget>(LayerName: string, widgetClassString: CommonUserWidgetClass<T>): void {
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem)
    }
}


