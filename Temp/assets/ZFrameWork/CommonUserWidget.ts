import { ZClass, ZObject } from "./Object";

export interface ZCommonUserWidgetClass<T extends ZCommonUserWidget> extends ZClass<T>
{
    prefabPath: string
}

export class ZCommonUserWidget extends ZObject {
    public static prefabPath: string = '';
    protected _rootNode: cc.Node;

    constructor() {
        super();
    }

    public get rootNode() : cc.Node {
        return this._rootNode
    }

    public initNode(node: cc.Node){
        this._rootNode = node
        this.init()
    }

    public init() {

    }

    public initLate() {

    }

    public onDestroy(): void {
        if (this._rootNode) {
            this._rootNode.removeFromParent()
        }
        this._rootNode = null
        super.onDestroy()
    }

    // public preLoadRes() {
    //     // let path = BasePanel.getPrefabPath();
    //     // GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(path,(prefab) => {
    //     //     const newNode = instantiate(prefab);
    //     //     this.node.addChild(newNode);
    //     // })
    // }

    // 还没有资源
    // public init(parent: Node = null, openLate: Function) {
    //     if (parent == null)
    //         this.parentRoot = GameInstance.getInstance().getCurWorld().getCurMainPanelNode();
    //     else
    //         this.parentRoot = parent
    //     let func = () => {
    //         this.initLate()
    //         openLate && openLate()
    //     }
    //     this.initPrefab(func);
    // }

    // // 资源加载完之后
    // public initLate() {
    //     console.log("panel iniLate");
    // }

    // public getNode() {
    //     return this.node;
    // }

    // public showPanel() {
    //     this.node.active = true;
    // }

    // public hidePanel() {
    //     this.node.active = false;
    // }

    // public destroy() {
    //     if (isValid(this.node)) {
    //         this.node.destroy();
    //     }
    //     this.parentRoot = null;
    //     this.node = null;
    //     this.nodeScript = null;
    // }
}