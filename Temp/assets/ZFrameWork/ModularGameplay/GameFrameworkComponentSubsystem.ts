import { ZActor, ZActorClass } from "../Actor";
import { ZActorComponent } from "../ActorComponent";
import { GameInstance } from "../GameInstance";
import { RegisterManager } from "../GameManager/RegisterManager";
import { ZClass } from "../Object";
import { ZSubsystem } from "../Subsystem";

class ComponentRequestInfo {
    className: string
    additionFlags: string
}
class ComponentRequest {
    receiverClassName: string
    componentClassName: string
}
// TODO 都还没有销毁
export class ZGameFrameworkComponentSubsystem extends ZSubsystem {
    public static AddGameFrameworkComponentReceiver(receiver: ZActor) {
        let gfc = GameInstance.getInstance().getSubsystem(ZGameFrameworkComponentSubsystem)
        if (gfc) {
            gfc.addReceiverInternal(receiver)
        }
    }

    public static removeGameFrameworkComponentReceiver(receiver: ZActor) {

        let gfc = GameInstance.getInstance().getSubsystem(ZGameFrameworkComponentSubsystem)
        if (gfc) {
            gfc.removeReceiverInternal(receiver)
        }
    }

    public static sendGameFrameworkComponentExtensionEvent(receiver: ZActor, eventName: string) {

    }

    public receiverClassToComponentClassMap: Map<string, Set<ComponentRequestInfo>> = new Map()
    public requestTrackingMap: Map<ComponentRequest, number> = new Map()

    public addReceiverInternal(receiver: ZActor) {
        for (let tempClass = receiver.constructor; tempClass != ZActor; tempClass = Object.getPrototypeOf(tempClass)) {
            let requestInfoSet = this.receiverClassToComponentClassMap.get(tempClass.name)
            requestInfoSet.forEach((requestInfo) => {
                if (requestInfo.className) {
                    this.createComponentOnInstance(receiver, requestInfo.className, requestInfo.additionFlags)
                }
            })
        }
    }

    public removeReceiverInternal(receiver: ZActor) {
        receiver.getComponents()
        // TInlineComponentArray<UActorComponent*> ComponentsToDestroy;
        // for (UActorComponent* Component : Receiver->GetComponents())
        // {
        //     if (UActorComponent* GFC = Cast<UActorComponent>(Component))
        //     {
        //         UClass* ComponentClass = GFC->GetClass();
        //         TSet<FObjectKey>* ComponentInstances = ComponentClassToComponentInstanceMap.Find(ComponentClass);
        //         if (ComponentInstances)
        //         {
        //             if (ComponentInstances->Contains(GFC))
        //             {
        //                 ComponentsToDestroy.Add(GFC);
        //             }
        //         }
        //     }
        // }

        // for (UActorComponent* Component : ComponentsToDestroy)
        // {
        //     DestroyInstancedComponent(Component);
        // }

        // SendExtensionEventInternal(Receiver, NAME_ReceiverRemoved);
    }

    public createComponentOnInstance(receiver: ZActor, componentClassName: string, flags: string) {
        // TODO 判断是不是有相同的组件
        // TODO 判断存在的组件是不是有继承的关系
        let componentClass = RegisterManager.getInstance().getClassByName<ZActorComponent>(componentClassName)
        let component = receiver.createDefaultSubobject(componentClass)
        component.init()
    }

    public addComponentRequest(receiverClass: ZActorClass<ZActor>, componentClass: ZClass<ZActorComponent>, additionFlags: string) {
        let newRequest = new ComponentRequest()
        newRequest.receiverClassName = receiverClass.name
        newRequest.componentClassName = componentClass.name

        let count = this.requestTrackingMap.get(newRequest)
        if (count) {
            count = count + 1
        } else {
            count = 1
        }
        this.requestTrackingMap.set(newRequest, count)
        if (count == 1) {
            let requestInfoSet = this.receiverClassToComponentClassMap.get(receiverClass.name)
            if (!requestInfoSet) {
                requestInfoSet = new Set()
            }
            let requestInfo = new ComponentRequestInfo()
            requestInfoSet.add(requestInfo)

            let actors = GameInstance.getInstance().getWorld().getAllActor()
            for (const tempActor of actors) {
                if (tempActor.constructor.name == receiverClass.name) {
                    this.createComponentOnInstance(tempActor, componentClass.name, additionFlags)
                }
            }
        }

    }

    public removeComponentOnInstance() {

    }
}