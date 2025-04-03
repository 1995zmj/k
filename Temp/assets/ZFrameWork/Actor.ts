import { ZActorComponent } from "./ActorComponent";
import { GameInstance } from "./GameInstance";
import { ZClass, ZObject } from "./Object";
import { ZWorld } from "./World";

export interface ZActorClass<T extends ZActor> {
    new(): T;
    prefabPath: string;
}
// 生命周期的调用还很混乱 TODO 要理一下流程，并写个文档
// TODO 分成了 本身的node节点，还有displaynode 这个后面挂接的表现类
export class ZActor extends ZObject {
    private _ownedComponents: Map<ZClass<ZActorComponent>, ZActorComponent> = new Map()
    protected _world: ZWorld = null
    public static prefabPath: string = ''
    protected _rootNode: cc.Node = null
    protected _displayNode: cc.Node = null
    private _wantUpdateDisplayNodeCount: number = 0

    public get rootNode(): cc.Node {
        return this._rootNode
    }

    constructor() {
        super();
        this._world = GameInstance.getInstance().getWorld()
        this.uid = this._world.getNextUid()
        this._rootNode = new cc.Node()
        this._rootNode.name = this.constructor.name + '-' + this.uid
    }


    public destroy() {
        this._rootNode.removeFromParent()
        this._rootNode = null
        this._displayNode = null
        this._world = null
        super.destroy()
    }

    public preInitializeComponents() {

    }

    public beginPlay() {

    }

    public update(dt: number) {

    }

    public endPlay() {

    }

    public initNode(node: cc.Node) {
        this._ownedComponents.forEach((value, key) => {
            value.destroy()
        });
        this._rootNode.addChild(node)
        this._displayNode = node
        if (this._wantUpdateDisplayNodeCount > 0) {
            this._wantUpdateDisplayNodeCount = 0
            this.tryUpdateDisplayNode()
        }
    }

    public tryUpdateDisplayNode() {
        if (this._displayNode) {
            this.onUpdateDisplayNode()
        }
        else {
            this._wantUpdateDisplayNodeCount += 1
        }
    }

    public onUpdateDisplayNode() {

    }


    public init() {
        this._ownedComponents.forEach((value, key) => {
            value.init()
        });
    }

    public findComponentByClass<T extends ZActorComponent>(componentClass: ZClass<T>): T {
        return this._ownedComponents.get(componentClass) as T
    }

    // 这个只能在构造函数内调用
    public createDefaultSubobject<T extends ZActorComponent>(componentClass: ZClass<T>): T {
        let component = GameInstance.getInstance().newObject(componentClass)
        this._ownedComponents.set(componentClass, component)
        return component
    }

    public clearAllComponents() {
        for (const key in this._ownedComponents) {
            let tempComponent = this._ownedComponents[key]
            tempComponent.destroy()
        }
        this._ownedComponents.clear()
    }

    public getComponents(): Map<ZClass<ZActorComponent>, ZActorComponent> {
        return this._ownedComponents
    }
}