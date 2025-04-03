import { ZCommonActivatableWidget } from "../../ZFrameWork/CommonActivatableWidget"
import { Delegate } from "../../ZFrameWork/GameManager/Delegate"

export interface BattlerInfo {
    name: string
    hp: number
    atk: number
}

export class BattlerInfoNode {

    private _rootNode: cc.Node

    public owner: ZMainBattleLayer
    public data: BattlerInfo
    public hpLabel;
    public atkLabel;
    public nameLabel;
    constructor(owner:ZMainBattleLayer, node: cc.Node, info: BattlerInfo) {
        this.owner = owner
        this._rootNode = node
        this.hpLabel = this._rootNode.getChildByName('txt_hp').getComponent(cc.Label)
        this.atkLabel = this._rootNode.getChildByName('txt_atk').getComponent(cc.Label)
        this.nameLabel = this._rootNode.getChildByName('txt_name').getComponent(cc.Label)
        this.hpLabel.string = info.hp
        this.atkLabel.string = info.atk
        this.nameLabel.string = info.name
    }
}

export class ZMainBattleLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_Battle_U'
    public aBattlerInfoNode: BattlerInfoNode
    public bBattlerInfoNode: BattlerInfoNode
    private _delegate: Delegate<()=>void>

    public init(): void {
        let closeBtn = this.rootNode.getChildByName('btn_close')
        this.bindBtnEvent(closeBtn, this.closeSelf)
    }

    public setBattle(a: BattlerInfo, b: BattlerInfo, callbackDelegate: Delegate<()=>void>) {
        this.aBattlerInfoNode = new BattlerInfoNode(this, this.rootNode.getChildByName('slot_a').getChildByName('P_BattleChar_E'), a)
        this.bBattlerInfoNode = new BattlerInfoNode(this, this.rootNode.getChildByName('slot_b').getChildByName('P_BattleChar_E'), b)
        this._delegate = callbackDelegate
    }

    public closeSelf(): void {
        this._delegate.broadcast()
        this._delegate = null
        super.closeSelf()
    }
}
