import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZGameMode } from "../ZFrameWork/GameMode";
import { ZMainGameState } from "./MainGameState";

export class ZMainGameMode extends ZGameMode {

    public moveDir(dir:number){
        let gameSate = this.gameState as ZMainGameState
        gameSate.playerMove(dir)
    }
}
RegisterManager.getInstance().registertActorClass(ZMainGameMode)