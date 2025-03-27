import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZGameStateComponent } from "../ZFrameWork/ModularGameplay/GameStateComponent";

export default class ZRoundComponent extends ZGameStateComponent {
    public init(): void {

    }
}

RegisterManager.getInstance().registertClass(ZRoundComponent)
