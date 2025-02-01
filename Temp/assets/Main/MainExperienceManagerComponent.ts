import ExperienceManagerComponent from "../ZFrameWork/ExperienceManagerComponent";
import { ZGameFeaturesSubsystem } from "../ZFrameWork/GameFeature/GameFeaturesSubsystem";
import { GameInstance } from "../ZFrameWork/GameInstance";
import { ZPrimaryGameLayout } from "../ZFrameWork/PrimaryGameLayout";
import { RegisterManager } from "../ZFrameWork/RegisterManager";
import { ZMainMeauLayer } from "./MainMeauLayer";

const { ccclass, property } = cc._decorator;
// 挂在场景根节点，用来加载初始化的
@ccclass
export default class MainMenuExperienceManagerComponent extends ExperienceManagerComponent {

    override start(): void {
        super.start()
        // ZPrimaryGameLayout.getPrimaryGameLayout().pushWidgetToLayerStackAsync('T1', ZMainMeauLayer)
    }
}
