// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

// import { G01GameLayout } from "../G101/script/G101GameLayout";
import { AssetSubsystem } from "./AssetSubsystem";
import { GameInstance } from "./GameInstance";

const { ccclass, property } = cc._decorator;
// 挂在场景根节点，用来加载初始化的
@ccclass
export default class ExperienceManagerComponent extends cc.Component {

    @property(cc.JsonAsset)
    experienceConfig: cc.JsonAsset = null;

    @property(cc.Node)
    myNode: cc.Node = null;

    @property(cc.Prefab)
    myPrefab: cc.Prefab = null;

    public start(): void {
        GameInstance.getInstance().addLocalPlayer()
    }

    initLate() {

    }

    onDestroy() {
        GameInstance.getInstance().removeLocalPlayer()
    }
}
