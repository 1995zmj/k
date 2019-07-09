const { ccclass, property } = cc._decorator;

@ccclass
export default class InputComponent extends cc.Component
{

    onkeyPressedCallBack: Function;
    onkeyReleasedCallBack: Function;
}
