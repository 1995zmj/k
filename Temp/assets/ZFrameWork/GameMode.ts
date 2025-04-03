import { ZMainPlayerState } from "../Game/MainPlayerState";
import { ZActor, ZActorClass } from "./Actor";
import { ExperienceData, GameModeData, GameModetConfigContainer } from "./DefinitionConfidg/GameModeConfigContainer";
import ZExperienceManagerComponent from "./ExperienceManagerComponent";
import { GameInstance } from "./GameInstance";
import { ConfigManager } from "./GameManager/ConfigManager";
import { RegisterManager } from "./GameManager/RegisterManager";
import { ZGameState } from "./GameState";
import { ZPawn } from "./Pawn";
import { ZPlayerState } from "./PlayerState";

export class ZGameMode extends ZActor {
    public gameModeData: GameModeData = null
    public gameState: ZGameState = null
    public pawn: ZPawn = null
    public playerController
    public playerState
    private _experienceData: ExperienceData = null

    public gameStateClass:ZActorClass<ZGameState>
    public playerStateClass:ZActorClass<ZPlayerState>

    constructor() {
        super();
        console.log("创建了 gamemode")


        let gameConfigdata = ConfigManager.getInstance().getConfig(GameModetConfigContainer)
        this._experienceData = gameConfigdata.getValue('experienceConfig')
        let gameModeClassString = gameConfigdata.getValue('gameStateClassString')
        this.gameStateClass = RegisterManager.getInstance().getActorClassByName(gameModeClassString)
        this.playerStateClass = ZMainPlayerState
    }


    public preInitializeComponents(): void {
        // 这里创建 gamestate
        this.gameState = GameInstance.getInstance().getWorld().spawnActor(this.gameStateClass)
        // 先临时放一下
        this.playerState = GameInstance.getInstance().getWorld().spawnActor(this.playerStateClass)
        this.playerState.init()
        
        super.preInitializeComponents()

        this.initGameState()
    }

    public initGame(): void {
    // this.gameState.init()
    }

    public initGameState(){

    }

    public initLate(): void {
        let experienceComponent = this.gameState.findComponentByClass(ZExperienceManagerComponent)
        experienceComponent.setCurrentExperience(this._experienceData)
    }

    public update(dt: number): void {
        this.pawn && this.pawn.update(dt)
    }

}
RegisterManager.getInstance().registertActorClass(ZGameMode)
