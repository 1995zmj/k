import { ZCommonActivatableWidget } from "../../ZFrameWork/CommonActivatableWidget"
import { GameInstance } from "../../ZFrameWork/GameInstance"
import { RegisterManager } from "../../ZFrameWork/GameManager/RegisterManager"

export class ZGameEndLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_GameEnd_U'

    public init(): void {
        let btnClose = this.rootNode.getChildByName('btn_close')
        this.bindBtnEvent(btnClose, this.closeSelf)
    }

    public closeSelf(): void {
        super.closeSelf()
        GameInstance.getInstance().tryChangeScence('HallScene')
    }
}
RegisterManager.getInstance().registertWidgetClass(ZGameEndLayer)
