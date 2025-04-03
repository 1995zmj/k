import { CommonUIExtensions } from "../ZFrameWork/CommonUIExtensions";
import { ControlFlowQueue } from "../ZFrameWork/ControlFlows/ControlFlowQueue";
import { GameInstance } from "../ZFrameWork/GameInstance";
import { Delegate } from "../ZFrameWork/GameManager/Delegate";
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZModularGameState } from "../ZFrameWork/ModularGameplay/ModularGameplayActors/ModularGameState";
import { GameContext, ZActionHandlerSubsystem } from "./ActionHandlerSubsystem";
import ZHero from "./Hero";
import ZTile from "./Tile";
import { ZGameEndLayer } from "./Widget/GameEndLayer";
import { ZMainGameLayer } from "./Widget/MainGameLayer";

export interface RoundData {
    roundIndex: number
    itemIndex: number
}

export class ZMainGameState extends ZModularGameState {
    public tiles: Array<ZTile> = new Array()
    public tilesData: Map<number, Array<RoundData>> = new Map<number, Array<RoundData>>()
    public itemData
    public curHero: ZHero = null
    public curHeroTileIndex: number = 3
    public curControlFlowQueue: ControlFlowQueue = null
    public triggerItemCompleted: Delegate<() => void>
    public tileCount: number = 7

    public curRound: number = 0
    public maxRound: number = 0
    private _isGameEnd: boolean = false
    private _initJsonCount = 0
    constructor() {
        super();
        this.initItemConfig()
    }

    public destroy(): void {

    }

    // 这里先临时处理，后面要动态注册
    public initItemConfig() {
        this.triggerItemCompleted = Delegate.create<() => void>()
        this.triggerItemCompleted.add(this.queueNext, this)
    }

    public loaded() {
        let customData = GameInstance.getInstance().getGlobalCustomData()
        let tempIndex = customData['levelIndex']
        if (!tempIndex) {
            tempIndex = 0
        }
        let jsonPath = 'json/level_data_' + tempIndex
        cc.resources.load(jsonPath, cc.JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.log(err);
                return;
            }
            let count = 0
            let data = jsonAsset.json
            for (let index = 0; index < this.tileCount; index++) {
                this.tilesData.set(index, [])
            }
            for (const key in data) {
                let tempData = data[key]
                for (let index = 0; index < this.tileCount; index++) {
                    let tempName = 'tile_' + (index + 1)
                    let tempItemIndex = tempData[tempName]
                    if (tempItemIndex) {
                        this.tilesData.get(index).push({
                            roundIndex: tempData['round_id'],
                            itemIndex: tempData[tempName]
                        })
                    }
                }
                count += 1
            }
            this.maxRound = count
            this._initJsonCount +=1
            this.ready()
        });
        cc.resources.load('json/item_data', cc.JsonAsset, (err, jsonAsset) => {
            if (err) {
                console.log(err);
                return;
            }
            this.itemData = jsonAsset.json
            this._initJsonCount +=1
            this.ready()
        });


        CommonUIExtensions.pushContentToLayer('UI.Layer.Game', ZMainGameLayer, null)

        GameInstance.getInstance().getGameMode().playerState.onAttributeChange.add(this.attributeChange, this)
    }

    public ready()
    {
        if (this._initJsonCount == 2) {
            this.initTiles()
        }
    }

    public attributeChange(key: string) {
        if (key == 'hp') {
            if (GameInstance.getInstance().getGameMode().playerState.hp <= 0) {
                this._isGameEnd = true
            }
        }
    }

    public initTiles() {
        
        
        for (let index = 0; index < this.tileCount; index++) {
            let tile = this._world.spawnActor(ZTile)
            tile.rootNode.setPosition(100 * (index - 3), 0)
            tile.setRoundDate(this.tilesData.get(index))
            this.tiles.push(tile)
        }

        this.curHero = this._world.spawnActor(ZHero)

        this.curControlFlowQueue = new ControlFlowQueue<ZMainGameState>();
        this.curControlFlowQueue.addStep(this.triggerRoundChangeBefor, this)
        this.curControlFlowQueue.addStep(this.triggerRoundChange, this)
        this.curControlFlowQueue.addStep(this.triggerRoundChangeAfter, this)
        this.updateHeroPos(1)
    }

    public changeRound() {
        if (this.curRound + 1 < this.maxRound) {
            this.curRound += 1
            for (const tile of this.tiles) {
                tile.changeRound(this.curRound)
            }
        }
        else if (this.curRound + 1 == this.maxRound) {
            this.curRound += 1
            for (const tile of this.tiles) {
                tile.destroyCurItemId()
                tile.changeRound(this.curRound)
            }
        }
        else {
            console.log('已经到最大回合')
            // 这里要进入boss
        }
    }

    public playerMove(dir: number) {
        if (this._isGameEnd) {
            console.log("游戏已经结束")
            return
        }
        if (!this.curControlFlowQueue || this.curControlFlowQueue.isActive) {
            console.log("请等待")
            return
        }
        let tempPosX = this.curHeroTileIndex + dir
        if (tempPosX >= 0 && tempPosX < this.tiles.length) {
            this.curHeroTileIndex = tempPosX
            this.updateHeroPos(dir)
        } else {
            console.log('移动到头了')
        }
    }

    public updateHeroPos(dir: number) {
        if (!this.curControlFlowQueue || this.curControlFlowQueue.isActive) {
            console.log("请等待")
            return
        }
        this.curHero.rootNode.setPosition(this.tiles[this.curHeroTileIndex].rootNode.getPosition().x, 50)
        this.curHero.rootNode.scaleX = dir
        this.curControlFlowQueue.start()
    }

    public triggerTile() {
        let tempTile = this.tiles[this.curHeroTileIndex]
        let itemId = tempTile.getCurItemId()
        if (itemId) {
            let itemData = this.itemData[itemId.toString()]
            if (itemData) {
                tempTile.destroyCurItemId()
                GameInstance.getInstance().getSubsystem(ZActionHandlerSubsystem).executeAll(new GameContext(this._world), [itemData], this.triggerItemCompleted)
            }
            else {
                console.error("itemid 有问题 没有找到对应数据", itemId)
                this.queueNext()
            }
        }
        else {
            this.queueNext()
        }
    }

    public triggerRoundChangeBefor() {
        if (this.checkGameOver()) {
            console.log("游戏已经结束")
            return
        }
        this.triggerTile()
    }

    public triggerRoundChange() {
        if (this.checkGameOver()) {
            console.log("游戏已经结束")
            return
        }
        this.changeRound()
        this.queueNext()
    }

    public triggerRoundChangeAfter() {
        if (this.checkGameOver()) {
            console.log("游戏已经结束")
            return
        }
        this.triggerTile()
    }

    public queueNext() {
        if (this.checkGameOver()) {
            CommonUIExtensions.pushContentToLayer('UI.Layer.Menu', ZGameEndLayer, null)
        }
        this.curControlFlowQueue.next()
    }

    public checkGameOver(): boolean {
        if (this._isGameEnd) {
            return true
        }
        if (this.maxRound == this.curRound)
        {
            let flag = true
            for (let index = 0; index < this.tileCount; index++) {
                let tempTile = this.tiles[index]
                let tempItemId = tempTile.getCurItemId()
                if (tempItemId > 0) {
                    flag = false
                    break
                }
            }
            return flag
        }

        return false
    }

}
RegisterManager.getInstance().registertActorClass(ZMainGameState)