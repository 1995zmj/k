import { ZActor } from "../ZFrameWork/Actor";
import { RoundData } from "./MainGameState";


class ItemNode {
    _owner: ZTile
    _rootNode: cc.Node
    _img: cc.Sprite
    _txt: cc.Label
    constructor(owner: ZTile, node: cc.Node) {
        this._rootNode = node
        this._owner = owner
        this.initExtraNode()
    }

    public initExtraNode() {
        this._txt = this._rootNode.getChildByName('txt_item').getComponent(cc.Label)
    }

    public show(flag) {
        this._rootNode.active = flag
    }

    public updateDispaly(data: RoundData) {
        this._txt.string = 'item: ' + data.itemIndex
    }
}

class NextItemNode extends ItemNode {
    _next_txt: cc.Label

    public initExtraNode(): void {
        this._txt = this._rootNode.getChildByName('txt_item').getComponent(cc.Label)
        this._next_txt = this._rootNode.getChildByName('txt_round').getComponent(cc.Label)
    }

    public updateDispaly(data: RoundData): void {
        super.updateDispaly(data)
        if (data.roundIndex - this._owner.curRoundIndex < 0)
        {
            console.log("zmj  ?")
        }
        this._next_txt.string = 'left round ' + (data.roundIndex - this._owner.curRoundIndex)
    }
}


export default class ZTile extends ZActor {
    public static prefabPath: string = 'actor/P_Tile';
    // 这里保存的是地块的所有数据
    private _data: Array<RoundData> = []
    // 当前应该使用的地块数据的下标
    private _curIndex: number = -1
    // 表示失效的地块数据的下标（小于这个的都失效）
    private _costIndex: number = -1

    // 这个是只当前回鹘
    private _curRoundIndex: number = -1

    private _curItemNode: ItemNode = null
    private _nextItemNode: NextItemNode = null


    public get curRoundIndex(): number {
        return this._curRoundIndex
    }


    public init(): void {
        super.init()
    }

    public setRoundDate(data: Array<RoundData>) {
        this._data = data
    }

    public getCurItemId() {
        if (this._curIndex >= 0 && this._curIndex < this._data.length && this._curIndex > this._costIndex) {
            return this._data[this._curIndex].itemIndex
        }

        return 0
    }

    public triggerItem()
    {
        
    }

    public destroyCurItemId(){
        this._costIndex = this._curIndex
        this.tryUpdateDisplayNode()
    }

    public changeRound(roundIndex) {
        if (this._curRoundIndex == roundIndex) {
            return
        }
        this._curRoundIndex = roundIndex
        let tempNextIndex = this._curIndex + 1
        if (this._data.length > tempNextIndex) {
            let nextNeedShowRoundIndex = this._data[tempNextIndex].roundIndex
            if (nextNeedShowRoundIndex == roundIndex) {
                this._curIndex = tempNextIndex
            }
        }

        this.tryUpdateDisplayNode()
    }
    public initNode(node: cc.Node): void {
        this._curItemNode = new ItemNode(this, node.getChildByName('slot_top'))
        this._nextItemNode = new NextItemNode(this, node.getChildByName('slot_bottom'))
        super.initNode(node)
    }

    public onUpdateDisplayNode() {
        //  更新当前物品
        if (this._curIndex >= 0 && this._curIndex < this._data.length && this._curIndex > this._costIndex) {
            this._curItemNode.updateDispaly(this._data[this._curIndex])
            this._curItemNode.show(true)
        }
        else {
            this._curItemNode.show(false)
        }
        // 更新下一个物品
        let tempIndex = this._curIndex + 1
        if (tempIndex >= 0 && tempIndex < this._data.length) {
            let nextRoundIndex = this._data[tempIndex].roundIndex
            if (nextRoundIndex - this._curRoundIndex < 5) {
                this._nextItemNode.updateDispaly(this._data[tempIndex])
                this._nextItemNode.show(true)
            }
            else {
                this._nextItemNode.show(false)
            }
        }
        else {
            this._nextItemNode.show(false)
        }
    }
}
