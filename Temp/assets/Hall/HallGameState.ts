import { CommonUIExtensions } from "../ZFrameWork/CommonUIExtensions";
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZModularGameState } from "../ZFrameWork/ModularGameplay/ModularGameplayActors/ModularGameState";
import { ZHallLayer } from "./HallLayer";

export class ZHallGameState extends ZModularGameState {
    public loaded() {
        CommonUIExtensions.pushContentToLayer('UI.Layer.GameMenu', ZHallLayer, null)
    }
}
RegisterManager.getInstance().registertActorClass(ZHallGameState)