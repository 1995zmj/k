import { ZActor, ZActorClass } from "../../Actor";
import { ZActorComponent } from "../../ActorComponent";
import { GameInstance } from "../../GameInstance";
import { RegisterManager } from "../../GameManager/RegisterManager";
import { ZGameFrameworkComponentSubsystem } from "../../ModularGameplay/GameFrameworkComponentSubsystem";
import { ZGameFeatureAction_AddWidget } from "./GameFeatureAction_AddWidget";

class GameFeatureComponentEntry {
    public actorClassName: string
    public componentClass: string
}

export class ZGameFeatureAction_AddComponent extends ZGameFeatureAction_AddWidget {
    private ComponentsList: Array<GameFeatureComponentEntry> = null

    constructor() {
        super();
        this.ComponentsList = new Array()
    }

    public handleActorExtension(context: any) {

    }

    public addToWorld(context: any) {
        this.addComponents(context)
    }

    public addComponents(context: any) {
        console.log(context)
        context.forEach(element => {
            let actorClassName = element[0]
            let componentClass = element[1]
            let tempClass = RegisterManager.getInstance().getActorClassByName<ZActor>(actorClassName) as ZActorClass<ZActor>
            let tempComponentClass = RegisterManager.getInstance().getClassByName<ZActorComponent>(componentClass)
            GameInstance.getInstance().getSubsystem(ZGameFrameworkComponentSubsystem).addComponentRequest(tempClass, tempComponentClass, "add")
        });

    }

}

RegisterManager.getInstance().registertClass(ZGameFeatureAction_AddComponent)