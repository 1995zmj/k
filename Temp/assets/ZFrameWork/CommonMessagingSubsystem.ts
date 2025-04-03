import { AssetSubsystem } from "./AssetSubsystem";
import { ZCommonUserWidget, ZCommonUserWidgetClass } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZGameUIPolicy } from "./GameUIPolicy";
import { ZSubsystem } from "./Subsystem";
import { CommonGameDialogDescriptor, ZCommonGameDialogLayer } from "./Widget/CommonGameDialogLayer";

export class ZCommonMessagingSubsystem extends ZSubsystem {

    public showConfirmation(descriptor:CommonGameDialogDescriptor, delegate){
        let rootLayout = GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout()
        rootLayout.pushWidgetToLayerStackAsync('UI.Layer.Moal', ZCommonGameDialogLayer, (widget)=>{
            widget.setupDialgo(descriptor, delegate)
        })
    }

    public showError()
    {

    }

    
    // public showTip()
    // {
    //     let rootLayout = GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).currentPolicy.getRootLayout()
    //     rootLayout.pushWidgetToLayerStackAsync
    // }
}


