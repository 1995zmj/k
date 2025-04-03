import { CommonUIExtensions } from "../ZFrameWork/CommonUIExtensions";
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZModularGameState } from "../ZFrameWork/ModularGameplay/ModularGameplayActors/ModularGameState";
import { ZMainMenuLayer } from "./MainMenuLayer";

export class ZMenuGameState extends ZModularGameState {
    public loaded() {
        CommonUIExtensions.pushContentToLayer('UI.Layer.GameMenu', ZMainMenuLayer, null)
    }
}
RegisterManager.getInstance().registertActorClass(ZMenuGameState)