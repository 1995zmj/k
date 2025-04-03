import { ZActor } from "./Actor";
import ZExperienceManagerComponent from "./ExperienceManagerComponent";
import { RegisterManager } from "./GameManager/RegisterManager";

export class ZGameState extends ZActor
{ 
    private experienceManagerComponent:ZExperienceManagerComponent = null
    constructor() {
        super();
        this.experienceManagerComponent = this.createDefaultSubobject(ZExperienceManagerComponent)
        console.log("初始化 gamestate")
        this.experienceManagerComponent.onExperienceLoaded.add(this.loaded, this)
    }

    public loaded(){
        console.log("gamestate loaded")
    }
}

RegisterManager.getInstance().registertActorClass(ZGameState)