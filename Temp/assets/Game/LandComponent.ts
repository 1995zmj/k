import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZGameStateComponent } from "../ZFrameWork/ModularGameplay/GameStateComponent";
import ZTile from "./Tile";

export default class ZLandComponent extends ZGameStateComponent {
    
    public init(): void {
        super.init()
        
    }
}

RegisterManager.getInstance().registertClass(ZLandComponent)
