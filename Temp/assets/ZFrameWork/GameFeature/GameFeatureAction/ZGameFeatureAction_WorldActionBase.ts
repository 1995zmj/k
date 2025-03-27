import { ZGameFeatureAction } from "../GameFeatureAction";

export interface LayoutRequest {
    layoutClassString: string;
    layerId: string;
}

export interface ElementRequest {
    widgetClassString: string;
    slotId: string;
}

export class ZGameFeatureAction_WorldActionBase extends ZGameFeatureAction {



    public onGameFeatureActivating(context: any): void {
        this.addToWorld(context)
    }

    public onGameFeatureDeactivating(context: any): void {
        
    }

    public addToWorld(context: any){

    }

}