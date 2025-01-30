import { ZCommonActivatableWidget } from "./CommonActivatableWidget";
import { ZCommonUserWidget } from "./CommonUserWidget";

// export interface PanelClass<T extends BasePanel> {
//     new(): T;
// }

export class ZCommonActivatableWidgetContainerBase extends ZCommonUserWidget {
    protected parentRoot: Node;
    protected node: Node;
    // protected nodeScript: BaseUI;

    constructor() {
        super();
        this.parentRoot = null;
        this.node = null;
        // this.nodeScript = null;
    }

    public getPrefabPath(): string {
        return ""
    }

    public addWidget(activatableWidget: ZCommonActivatableWidget) {
        // let path = BasePanel.getPrefabPath();
        // GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(path,(prefab) => {
        //     const newNode = instantiate(prefab);
        //     this.node.addChild(newNode);
        // })
    }
}