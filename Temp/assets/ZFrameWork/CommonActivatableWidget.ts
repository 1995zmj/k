import { ZCommonUserWidget } from "./CommonUserWidget";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";

// export interface PanelClass<T extends BasePanel> {
//     new(): T;
// }

export class ZCommonActivatableWidget extends ZCommonUserWidget {

    // public preLoadRes() {
    //     // let path = BasePanel.getPrefabPath();
    //     // GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(path,(prefab) => {
    //     //     const newNode = instantiate(prefab);
    //     //     this.node.addChild(newNode);
    //     // })
    // }

    public initLate() {

    }

    // // 还没有资源
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

    // public initPrefab(callback: Function) {
    //     let path = this.getPrefabPath();
    //     GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(path, (prefab) => {
    //         this.node = instantiate(prefab);
    //         this.nodeScript = this.node.getComponent("BaseUI") as BaseUI;
    //         this.parentRoot.addChild(this.node);
    //         callback();
    //     })
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

    public bindBtnEvent(btnNode: cc.Node, func: (button) => void) {
        btnNode.on('click', func, this);
    }

    public closeSelf(): void {
        ZPrimaryGameLayout.getPrimaryGameLayout().findAndRemoveWidgetFromLayer(this)
    }
}