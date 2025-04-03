import { ZCommonActivatableWidget } from "../ZFrameWork/CommonActivatableWidget"
import { CommonUIExtensions } from "../ZFrameWork/CommonUIExtensions"
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager"
import { ZSelectLayer } from "./SelectLayer"


export class ZHallLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_HallLayer_U'

    public init(): void {
        let selectNode = this.rootNode.getChildByName('btn_select')
        this.bindBtnEvent(selectNode, this.selectLevel)
    }

    public selectLevel(){
        CommonUIExtensions.pushContentToLayer('UI.Layer.Menu', ZSelectLayer, null)
    }
}
RegisterManager.getInstance().registertWidgetClass(ZHallLayer)
