import { ZCommonActivatableWidget } from "../../ZFrameWork/CommonActivatableWidget"
import { Delegate } from "../GameManager/Delegate"



export interface ConfirmationDialogAction {
    result: string
    optionalDisplayText: string
}


export class CommonGameDialogDescriptor {
    public static createConfirmationOk(header: string, body: string) {
        let descriptor = new CommonGameDialogDescriptor()
        descriptor.header = header
        descriptor.body = body

        descriptor.buttonActions.push({
            result: 'Confirmed',
            optionalDisplayText: 'ok'
        })

        return descriptor
    }
    public static createConfirmationOkCancel() {

    }
    public static createConfirmationYesNo(header: string, body: string) {

        let descriptor = new CommonGameDialogDescriptor()
        descriptor.header = header
        descriptor.body = body

        descriptor.buttonActions.push({
            result: 'Confirmed',
            optionalDisplayText: 'Yes'
        })
        descriptor.buttonActions.push({
            result: 'Declined',
            optionalDisplayText: 'No'
        })

        return descriptor
    }
    public static createConfirmationYesNoCancel() {

    }

    public header: string
    public body: string

    public buttonActions: Array<ConfirmationDialogAction> = []

}

export class ZCommonGameDialogLayer extends ZCommonActivatableWidget {
    static prefabPath: string = 'ui/P_Dialog_U'

    public headerLable;
    public bodyLable;
    public closeBtn;
    public resultCallback: Delegate
    public init(): void {
        this.headerLable = this.rootNode.getChildByName('txt_header').getComponent(cc.Label)
        this.bodyLable = this.rootNode.getChildByName('txt_body').getComponent(cc.Label)
        this.closeBtn = this.rootNode.getChildByName('btn_close')

        this.bindBtnEvent(this.closeBtn, this.closeSelf)
    }

    public setupDialgo(descriptor: CommonGameDialogDescriptor, delegate: Delegate<() => void>) {
        this.headerLable.string = descriptor.header
        this.bodyLable.string = descriptor.body
        this.resultCallback = delegate
    }

    public closeSelf(): void {
        this.resultCallback.broadcast()
        this.resultCallback = null
        super.closeSelf()
    }

    public KillDialog() {

    }
}
