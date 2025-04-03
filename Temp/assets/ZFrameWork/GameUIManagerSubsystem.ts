import { AssetSubsystem } from "./AssetSubsystem";
import { ZCommonUserWidget, ZCommonUserWidgetClass } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIPolicy } from "./GameUIPolicy";
import { ZSubsystem } from "./Subsystem";

export class ZGameUIManagerSubsystem extends ZSubsystem {

    private _currentPolicy: ZGameUIPolicy

    constructor() {
        super();
        // TODO 这里要创建一个现在先固定后面可以配置
        
    }

    public get currentPolicy(): ZGameUIPolicy {
        return this._currentPolicy
    }

    public set currentPolicy(inPolicy: ZGameUIPolicy) {
        if (this._currentPolicy != inPolicy) {
            this._currentPolicy = inPolicy
        }
    }

    public notifyPlayerAdded() {
        if (!this.currentPolicy) {
            this._currentPolicy = GameInstance.getInstance().newObject(ZGameUIPolicy)
        }
        this.currentPolicy.notifyPlayerAdded()

    }

    public notifyPlayerRemoved() {
        if (this.currentPolicy) {
            this.currentPolicy.notifyPlayerRemoved()
            this.currentPolicy = null
        }
    }

    public createWidget<T extends ZCommonUserWidget>(widgetclass: ZCommonUserWidgetClass<T>, callback: (T) => void) {
        GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(widgetclass.prefabPath, (prefab) => {
            console.log(prefab)
            let node: cc.Node = cc.instantiate(prefab);
            let widget = new widgetclass()
            widget.initNode(node)
            callback(widget)
        })
    }
}


