import { ZCommonActivatableWidget } from "../ZFrameWork/CommonActivatableWidget"
import { GameInstance } from "../ZFrameWork/GameInstance"
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager"


class ListViewController {
    _scrollView
    _item
    items = []
    _data
    _contentHeight = 0
    _startIndex
    _endIndex
    _owner
    _func
    constructor(owner, scrollView: cc.ScrollView, item: cc.Node, func: (node: cc.Node, index: number) => void, spawnCount: number = 5) {
        this._owner = owner
        this._scrollView = scrollView
        this._item = item
        this._func = func.bind(owner)
        this._scrollView.content.removeAllChildren()
        for (let index = 0; index < spawnCount; index++) {
            let tempItem = cc.instantiate<cc.Node>(this._item)
            this._scrollView.content.addChild(tempItem)
            this.items.push(tempItem)
        }
        this._scrollView.node.on('scrolling', this.scrollingEvent, this);
    }

    public updateData(data) {
        this._data = data
        let tempItemheight = Math.abs(this._item.height)
        this._scrollView.content.height = tempItemheight * this._data.length
        this.updateItem()
    }

    public updateItem() {
        let offset = this._scrollView.getScrollOffset().y
        let pre = offset / (this._scrollView.content.height - this._scrollView.node.height)
        pre = Math.max(0, pre)
        pre = Math.min(1, pre)
        this._startIndex = Math.floor(pre * (this._data.length - this.items.length + 1))
        this._endIndex = Math.min(this._startIndex + this.items.length, this._data.length)
        // console.log('s - e, ', this._startIndex, this._endIndex)
        // TODO 后面不是每个都更新
        for (let index = this._startIndex; index < this._endIndex; index++) {
            let curIndex = index % this.items.length
            let tempNode = this.items[curIndex]
            tempNode.setPosition(tempNode.x, -index * this._item.height)
            this._func(this.items[curIndex], index)
        }
    }

    public scrollingEvent() {
        this.updateItem()
    }

}

export class ZSelectLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_SelectLayer_U'

    public init(): void {
        let levelSv = this.rootNode.getChildByName('sv_level').getComponent(cc.ScrollView)
        let closeBtn = this.rootNode.getChildByName('btn_close')
        this.bindBtnEvent(closeBtn, this.closeSelf)
        let itemNode = levelSv.content.children[0]
        let lvc = new ListViewController(this, levelSv, itemNode, this.updateItemData, 6)
        lvc.updateData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    }

    public updateItemData(node: cc.Node, index: number) {
        node.getChildByName('txt_info').getComponent(cc.Label).string = index.toString()
        if (node['customData']) {
            node["customData"].dataIndex = index
        }
        else {
            node["customData"] = { dataIndex: index }
            this.bindBtnEvent(node, this.clickItem)
        }
    }

    public clickItem(event) {
        const targetNode = event.target as cc.Node;
        const data = targetNode["customData"];
        console.log('zmj, ', data.dataIndex)
        let tempLevelIndex = data.dataIndex
        GameInstance.getInstance().tryChangeScence('GameScene', {levelIndex: tempLevelIndex})
    }
}
RegisterManager.getInstance().registertWidgetClass(ZSelectLayer)
