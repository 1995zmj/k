import { ZCommonActivatableWidget } from "../ZFrameWork/CommonActivatableWidget"
import { GameInstance } from "../ZFrameWork/GameInstance"
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager"

export class ZMainMenuLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_MainMenu_U'

    public init(): void {
        let btnNode = this.rootNode.getChildByName('btn_start')
        this.bindBtnEvent(btnNode, this.startGame)
    }

    public startGame() {
        this.closeSelf()
        GameInstance.getInstance().tryChangeScence('HallScene')
    }
}
RegisterManager.getInstance().registertWidgetClass(ZMainMenuLayer)
