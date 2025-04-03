import { GameInstance } from "../../ZFrameWork/GameInstance"
import { RegisterManager } from "../../ZFrameWork/GameManager/RegisterManager"
import { ZElementWidget } from "../../ZFrameWork/WidgetItem"
import { ZWorld } from "../../ZFrameWork/World"


export class ZPlayerInfoElement extends ZElementWidget {
    static prefabPath: string = 'ui/P_PlayerInfo_E'

    public hpLable: cc.Label
    public atkLable: cc.Label
    public coinLable: cc.Label
    public init(): void {
        GameInstance.getInstance().getGameMode().playerState.onAttributeChange.add(this.attributeChange, this)
        this.hpLable =this.rootNode.getChildByName('txt_info_hp').getComponent(cc.Label)
        this.atkLable =this.rootNode.getChildByName('txt_info_atk').getComponent(cc.Label)
        this.coinLable =this.rootNode.getChildByName('txt_info_coin').getComponent(cc.Label)
        this.UpdateDisplay()
    }

    public UpdateDisplay()
    {
        let playerState = GameInstance.getInstance().getGameMode().playerState
        this.hpLable.string = 'hp ' + playerState.hp
        this.atkLable.string = 'atk ' + playerState.atk
        this.coinLable.string = 'coin ' + playerState.coin
    }

    public attributeChange(attributeKey: string)
    {
        this.UpdateDisplay()
    }
    
}
RegisterManager.getInstance().registertWidgetClass(ZPlayerInfoElement)
