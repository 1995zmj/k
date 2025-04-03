import { ZCommonActivatableWidget } from "../../ZFrameWork/CommonActivatableWidget"
import { GameInstance } from "../../ZFrameWork/GameInstance"
import { RegisterManager } from "../../ZFrameWork/GameManager/RegisterManager"
import { ZUIExtensionSystem } from "../../ZFrameWork/UIExtension/UIExtensionSystem"
import { ZMainGameMode } from "../MainGameMode"


export class ZMainGameLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_MainGame_U'

    public init(): void {
        GameInstance.getInstance().getSubsystem(ZUIExtensionSystem).registerExtension('Slot.Game.Info', 'ZPlayerInfoElement')

        let btnLeft = this.rootNode.getChildByName('btn_left')
        let btnRight = this.rootNode.getChildByName('btn_right')
        this.bindBtnEvent(btnLeft, this.moveLeft)
        this.bindBtnEvent(btnRight, this.moveRight)
    }

    public moveLeft() {
        let gameMode = GameInstance.getInstance().getGameMode() as ZMainGameMode
        gameMode.moveDir(-1)
    }

    public moveRight() {
        let gameMode = GameInstance.getInstance().getGameMode() as ZMainGameMode
        gameMode.moveDir(1)
    }
}
RegisterManager.getInstance().registertWidgetClass(ZMainGameLayer)
