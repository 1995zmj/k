import { ZObject } from "./Object";

ZObject

export interface CommonUserWidgetClass<T extends ZCommonUserWidget> {
    new(node: cc.Node): T
    prefabPath: string
}

export class ZCommonUserWidget extends ZObject {
    static prefabPath: string = '';
    protected _rootNode: cc.Node;

    constructor(node: cc.Node) {
        super();
        this._rootNode = node
        // 这里要添加引用计数，（不挂在根节点会被回收的）
        this.init()
    }

    public get rootNode() : cc.Node {
        return this._rootNode
    }

    public init(){

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