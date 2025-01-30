import ExperienceManagerComponent from "../ZFrameWork/ExperienceManagerComponent";
import { ZGameFeaturesSubsystem } from "../ZFrameWork/GameFeature/GameFeaturesSubsystem";
import { GameInstance } from "../ZFrameWork/GameInstance";
import { RegisterClassManager } from "../ZFrameWork/RegisterClassManager";

const {ccclass, property} = cc._decorator;
// 挂在场景根节点，用来加载初始化的
@ccclass
export default class MainMenuExperienceManagerComponent extends ExperienceManagerComponent {

    start () {
        GameInstance.getInstance().getSubsystem(ZGameFeaturesSubsystem).loadGameFeature('G101', ()=>{
            RegisterClassManager.getInstance().getClass('G101', 'G101GameLayout')
        })
    }
}
