import { ZCommonUserWidget } from "./CommonUserWidget";
import { ZPrimaryGameLayout } from "./PrimaryGameLayout";

export class ZCommonActivatableWidget extends ZCommonUserWidget {

    public bindBtnEvent(btnNode: cc.Node, func: (button) => void) {
        btnNode.on('click', func, this);
    }

    public closeSelf(): void {
        ZPrimaryGameLayout.getPrimaryGameLayout().findAndRemoveWidgetFromLayer(this)
    }
}