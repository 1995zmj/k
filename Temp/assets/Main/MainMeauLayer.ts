import { ZCommonActivatableWidget } from "../ZFrameWork/CommonActivatableWidget";
import { RegisterManager } from "../ZFrameWork/RegisterManager";

export class ZMainMeauLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_MainMean_U'

    public init(): void {
        console.log('zmj')
        let btnNode = this.rootNode.getChildByName('btn_close')
        this.bindBtnEvent(btnNode, ()=>{
            RegisterManager.getInstance().getClass('', '')
            // this.closeSelf()
        })
    }

}