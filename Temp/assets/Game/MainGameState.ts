import { data_level_1 } from "../DataSrc/level_1";
import { Delegate, DelegateManager } from "../ZFrameWork/GameManager/DelegateManager";
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZModularGameState } from "../ZFrameWork/ModularGameplay/ModularGameplayActors/ModularGameState";
import ZHero from "./Hero";
import ZTile from "./Tile";

export interface RoundData {
    roundIndex: number
    itemIndex: number
}


export class ZMainGameState extends ZModularGameState {
    // public onPlayerMove: Delegate = null
    public tiles: Array<ZTile> = new Array()
    public tilesData: Map<number, Array<RoundData>> = new Map()
    public curHero: ZHero = null
    public curHeroTileIndex: number = 3

    public curRound: number = 0
    public maxRound: number = 0
    constructor() {
        super();
        // this.onPlayerMove = DelegateManager.getInstance().Create()
    }

    public loaded() {
        let tileCount = 7

        for (let index = 0; index < tileCount; index++) {
            this.tilesData.set(index, [])
        }

        let count = 0
        for (const key in data_level_1) {
            let tempData = data_level_1[key]
            for (let index = 0; index < tileCount; index++) {
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
        for (let index = 0; index < tileCount; index++) {
            let tile = this._world.spawnActor(ZTile)
            tile.rootNode.setPosition(100 * (index - 3), 0)
            tile.setRoundDate(this.tilesData.get(index))
            this.tiles.push(tile)
        }

        this.curHero = this._world.spawnActor(ZHero)
        this.updateHeroPos(1)
    }

    public changeRound() {
        if (this.curRound + 1 <= this.maxRound) {
            this.curRound += 1
            for (const tile of this.tiles) {
                tile.changeRound(this.curRound)
            }
        } else {
            console.log('已经到最大回合')
        }
    }

    public playerMove(dir: number) {
        let tempPosX = this.curHeroTileIndex + dir
        if (tempPosX >= 0 && tempPosX < this.tiles.length) {
            this.curHeroTileIndex = tempPosX
            this.updateHeroPos(dir)
        } else {
            console.log('移动到头了')
        }
    }

    public updateHeroPos(dir: number) {
        this.curHero.rootNode.setPosition(this.tiles[this.curHeroTileIndex].rootNode.getPosition().x, 50)
        this.curHero.rootNode.scaleX = dir

        this.triggerTile()
        this.triggerRoundChange()
        this.triggerRoundChangeLate()
    }

    public triggerTile() {
        let tempTile = this.tiles[this.curHeroTileIndex]
        let itemId = tempTile.getCurItemId()
        if (itemId) {
            console.log("triggerTile itemId: ", itemId)
        }
        tempTile.destroyCurItemId()
    }

    public triggerRoundChange() {
        this.changeRound()
    }

    public triggerRoundChangeLate() {
        let tempTile = this.tiles[this.curHeroTileIndex]
        let itemId = tempTile.getCurItemId()
        // console.log("triggerTile itemId: ", itemId)
    }

}
RegisterManager.getInstance().registertActorClass(ZMainGameState)