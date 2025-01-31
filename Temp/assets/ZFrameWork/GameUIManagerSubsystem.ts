import { AssetSubsystem } from "./AssetSubsystem";
import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";
import { GameInstance } from "./GameInstance";
import { ZGameUIPolicy } from "./GameUIPolicy";
import { ZSubsystem } from "./Subsystem";



export class ZGameUIManagerSubsystem extends ZSubsystem {

    private _currentPolicy: ZGameUIPolicy

    constructor() {
        super();
        // TODO 这里要创建一个现在先固定后面可以配置
        this._currentPolicy = new ZGameUIPolicy()
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
        if (this.currentPolicy) {
            this.currentPolicy.notifyPlayerAdded()
        }
    }

    public notifyPlayerRemoved() {
        if (this.currentPolicy) {
            this.currentPolicy.notifyPlayerRemoved()
        }
    }

    // 有可能返回空哦
    public async createWidgetAsync<T extends ZCommonUserWidget>(widgetclass: CommonUserWidgetClass<T>) {
        try {
            let prefab = await GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefabPromise(widgetclass.prefabPath)
            console.log(prefab)
            let node: cc.Node = cc.instantiate(prefab);
            return new widgetclass(node)
        } catch (error) {
            return null
        }
    }

    public createWidget<T extends ZCommonUserWidget>(widgetclass: CommonUserWidgetClass<T>, callback: (T) => void) {
        GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(widgetclass.prefabPath, (prefab) => {
            console.log(prefab)
            let node: cc.Node = cc.instantiate(prefab);
            callback(new widgetclass(node))
        })
    }
    // private prefabMap: Map<string, Prefab>;
    // constructor()
    // {
    //     super();
    //     console.log("AssetSubsystem create");
    //     this.prefabMap = new Map();
    // }

    // public loadPrefab(prefabPath:string, callback: Function)
    // {
    //     console.log(prefabPath);
    //     let tempPrefab = this.prefabMap.get(prefabPath);
    //     if (tempPrefab) {
    //         callback(tempPrefab)
    //     }
    //     else
    //     {
    //         resources.load(prefabPath, Prefab, (err, prefab) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             this.prefabMap[prefabPath] = prefab;
    //             callback(prefab)
    //         });
    //     }
    // }


    // public loadSpriteFrame(spriteFramePath:string, callback: Function)
    // {
    //     console.log(spriteFramePath);
    //     resources.load(spriteFramePath, SpriteFrame, (err, spriteFrame) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         callback(spriteFrame)
    //     });
    // }
}


