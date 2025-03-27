import { GameModetConfigContainer } from "../DefinitionConfidg/GameModeConfigContainer";
import { GameInstance } from "../GameInstance";
import { ConfigManager } from "../GameManager/ConfigManager";
import { RegisterManager } from "../GameManager/RegisterManager";
import { ZGameMode } from "../GameMode";
import { ZGameUIManagerSubsystem } from "../GameUIManagerSubsystem";
import * as XLSX from 'xlsx';
import { ZWorld } from "../World";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldComp extends cc.Component {

    @property(cc.JsonAsset)
    gameConfig: cc.JsonAsset = null
    
    _world:ZWorld = null
    protected onLoad(): void {
        if (!this.gameConfig) {
            console.log('检查 gameConfig')
            return
        }

        GameInstance.getInstance().changeWorld(this.node)
        this._world = GameInstance.getInstance().getWorld()
        let gameConfigdata = ConfigManager.getInstance().creatConfig(this.gameConfig, GameModetConfigContainer)
        GameInstance.getInstance().getWorld().setGameConfig(gameConfigdata)
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).notifyPlayerAdded()
    }

    protected start(): void {
        GameInstance.getInstance().getWorld().initLate()

    }

    protected update(dt: number): void {
        GameInstance.getInstance().getWorld().update(dt)
    }

    // protected onDestroy(): void {
    //     GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).notifyPlayerRemoved()
    // }

}
