import { CommonUIExtensions } from "../../CommonUIExtensions";
import { RegisterManager } from "../../GameManager/RegisterManager";
import { ZGameFeatureAction_WorldActionBase } from "./ZGameFeatureAction_WorldActionBase";

export interface LayoutRequest {
    layoutClassString: string;
    layerId: string;
}

export interface ElementRequest {
    widgetClassString: string;
    slotId: string;
}

export class ZGameFeatureAction_AddWidget extends ZGameFeatureAction_WorldActionBase {

    private layouts: Array<LayoutRequest> = null
    private widgets: Array<ElementRequest> = null

    public handleActorExtension(context: any){

    }

    public addToWorld(context: any){
        this.addWidgets(context)
    }

    public addWidgets(context: any){
        console.log(context)
        context.forEach(element => {
            let tempType = element[0]
            
            if (tempType == 'LayoutRequest') {
                let layoutClassString = element[1]
                let layerId = element[2]
                CommonUIExtensions.pushContentToLayerByName(layerId, layoutClassString)
            }
        });
    }

}

RegisterManager.getInstance().registertClass(ZGameFeatureAction_AddWidget)