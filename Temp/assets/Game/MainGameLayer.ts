import { AssetSubsystem } from "../ZFrameWork/AssetSubsystem"
import { ZCommonActivatableWidget } from "../ZFrameWork/CommonActivatableWidget"
import { GameInstance } from "../ZFrameWork/GameInstance"
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager"
import TouchComp from "../ZFrameWork/Tool/TouchComp"
import WorldComp from "../ZFrameWork/Tool/WorldComp"
import { ZMainGameMode } from "./MainGameMode"

export class ZMainGameLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_MainGame_U'

    public init(): void {
        let btnLeft = this.rootNode.getChildByName('btn_left')
        let btnRight = this.rootNode.getChildByName('btn_right')
        this.bindBtnEvent(btnLeft, this.moveLeft)
        this.bindBtnEvent(btnRight, this.moveRight)
        // this.initTouchNode()
    }

    // public initTouchNode() {
    //     let path = 'ui/P_Input_U'
    //     GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(path, (prefab) => {
    //         const newNode = cc.instantiate(prefab);
    //         this.rootNode.addChild(newNode);
    //         let touchComp = newNode.getComponent(TouchComp)
    //         touchComp.registerEvent((dir) => {
    //             GameInstance.getInstance().getWorld().getComponent(WorldComp).gameMode.pawn.tryMove(dir)
    //         }, this)
    //     })
    // }

    // public startGame() {
    //     this.closeSelf()
    //     cc.director.loadScene("GameScene")
    // }

    public moveLeft() {
        let gameMode = GameInstance.getInstance().getGameMode() as ZMainGameMode
        gameMode.moveDir(-1)
    }

    public moveRight() {
        let gameMode = GameInstance.getInstance().getGameMode() as ZMainGameMode
        gameMode.moveDir(1)
    }
}
RegisterManager.getInstance().registertWidgetClass(ZMainGameLayer)
