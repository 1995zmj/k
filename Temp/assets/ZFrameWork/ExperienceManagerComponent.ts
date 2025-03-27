
import { ExperienceData } from "./DefinitionConfidg/GameModeConfigContainer";
import { ZGameFeatureAction } from "./GameFeature/GameFeatureAction";
import { Delegate, DelegateManager } from "./GameManager/DelegateManager";
import { RegisterManager } from "./GameManager/RegisterManager";
import { ZGameStateComponent } from "./ModularGameplay/GameStateComponent";

enum EExperienceLoadState{
    Unloaded,
	Loading,
	LoadingGameFeatures,
	LoadingChaosTestingDelay,
	ExecutingActions,
	Loaded,
	Deactivating
}

export default class ZExperienceManagerComponent extends ZGameStateComponent {

    private _loadState: EExperienceLoadState = EExperienceLoadState.Unloaded
    private _currentExperience: ExperienceData = null
    public onExperienceLoaded: Delegate = null

    constructor() {
        super();
        this.onExperienceLoaded = DelegateManager.getInstance().Create()
    }

    public setCurrentExperience(experienceData: ExperienceData) {
        this._currentExperience = experienceData
        this.startExperienceLoad()
    }

    public startExperienceLoad() {
        console.log("开始 startExperienceLoad")
        this._loadState = EExperienceLoadState.Loading

        this._currentExperience.actions.forEach(element => {
            let tempClassName = "ZGameFeatureAction_" + element.actionClassName
            console.log("zmj actions", tempClassName)
            let tempClass = RegisterManager.getInstance().getClassByName<ZGameFeatureAction>(tempClassName)
            let gameFeatureAction = new tempClass()
            gameFeatureAction.onGameFeatureActivating(element.data)
        });

        this.onExperienceLoaded.broadcast()
    }
}
