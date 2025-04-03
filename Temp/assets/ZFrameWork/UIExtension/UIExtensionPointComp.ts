import { GameInstance } from "../GameInstance";
import { Delegate } from "../GameManager/Delegate";
import { RegisterManager } from "../GameManager/RegisterManager";
import { ZGameUIManagerSubsystem } from "../GameUIManagerSubsystem";
import { UIExtensionPointHandle, UIExtensionRequest, ZUIExtensionSystem } from "./UIExtensionSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIExtensionPointComp extends cc.Component {

    @property()
    slotName: string = ''


    delegate: Delegate<(action: string, request: UIExtensionRequest) => void>
    handle: UIExtensionPointHandle

    protected onLoad(): void {
        let tempName = this.node.name;
        if (tempName.startsWith('slot')) {
            this.delegate = Delegate.create<(action, req) => void>()
            this.delegate.add(this.OnAddOrRemoveExtension, this)
            if (this.slotName != '') {
                this.handle = GameInstance.getInstance().getSubsystem(ZUIExtensionSystem).registerExtensionPoint(this.slotName, 'ExactMatch', ['ZPlayerInfoElement'], this.delegate)
            }
        }
    }

    public OnAddOrRemoveExtension(action: string, request: UIExtensionRequest): void {
        let tempClass = RegisterManager.getInstance().getWidgetClassByName(request.extensionHandle.extension.elementClassString)
        GameInstance.getInstance().getSubsystem(ZGameUIManagerSubsystem).createWidget(tempClass, (tempLayout) => {
            this.node.addChild(tempLayout.rootNode)
        })
    }

    protected onDestroy(): void {
        if (this.slotName != '' && this.handle) {
            GameInstance.getInstance().getSubsystem(ZUIExtensionSystem).unregisterExtensionPoint(this.handle)
            this.delegate.destroy()
            this.delegate = null
        }
    }
}
