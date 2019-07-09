import { AnimalConfigContainer } from "../Config/AnimalConfigContainer";
import { GridConfigContainer } from "../Config/GridConfigContainer";
import { ConfigManager } from "../Manager/ConfigManager";
import { PoolManager } from "../Manager/PoolManager";
import { UIManager } from "../Manager/UIManager";
import Animal from "../Object/Animal";
import { AnimalNodePool } from "../Pool/AnimalNodePool";
import { GridNodePool } from "../Pool/GridNodePool";
import { GridHelp } from "../Util/GridHelp";
import { BaseUI } from "./BaseUI";
import ShopUI from "./ShopUI";
import { GameDataManager } from "../Manager/GameDataManager";
import { ShopInfo } from "../Data/ShopInfo";
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import LayerUI from "./LayerUI";
import { ConstValue } from "../Data/ConstValue";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUI extends BaseUI
{
    protected static className = "MainUI";

    @property(cc.Node)
    private mapLayer: cc.Node = null;
    @property(cc.Node)
    private animalLayer: cc.Node = null;

    @property(cc.Label)
    private goldLabel: cc.Label = null;

    start()
    {
        // this.initMap();
        // this.initAnimal();
        // this.initWarPlatformInfo();
    }

    update(dt)
    {
        ListenerManager.getInstance().emit(ListenerType.LoopUpdate, dt);
    }


    // initMap() {
    //     let nodePool = PoolManager.getInstance().getNodePool(GridNodePool) as GridNodePool;
    //     let container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;
    //     let data = container.getGridConfigData();

    //     for (let index = data.length - 1; index >= 0; index--) {
    //         let node = nodePool.get();

    //         const element = data[index];
    //         node.position = container.getPosition(element.id);

    //         node.parent = this.mapLayer;
    //     }
    // }

    // initAnimal() {
    //     let container = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
    //     let data = container.getAnimalConfigData();
    //     let nodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;

    //     for (let index = 2; index >= 0; index--) {
    //         let node = nodePool.get();
    //         (node.getComponent(Animal) as Animal).init(data[index].name);

    //         node.position = GridHelp.getGridPosition(index);

    //         node.parent = this.mapLayer;
    //     }
    // }

    // initWarPlatformInfo()
    // {
    //     let warPlatformInfo = GameDataManager.getInstance().getGameData().warPlatformInfo;

    //     let container = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
    //     let data = container.getAnimalConfigData();
    //     let nodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;

    //     cc.log(warPlatformInfo);
    //     let array = warPlatformInfo.unitInfoList;
    //     for (let index = 0; index < array.length; index++) {
    //         const element = array[index];
    //         // if(typeof UnitInfo == UnitInfo)
    //         // {

    //         // }
    //     }

    // }


    // playChangeCoinEffect(present: number, target: number, label: cc.Label, callback: Function, time?: number)
    // {
    //     let correctTime = time ? time : 1;

    //     let obj = {
    //         k: present,
    //     }
    //     cc.tween(obj)
    //         .to(correctTime, { k: target },
    //             {
    //                 progress: (start, end, current, ratio) =>
    //                 {
    //                     let temp =Math.floor(start + (end - start) * ratio);
    //                     label.string = temp.toString();
    //                     return temp;
    //                 }
    //             })
    //         .call(callback)
    //         .start()
    // }

    // btn()
    // {
    //     this.playChangeCoinEffect(600,1200,this.goldLabel,()=>{
    //         cc.log("wanc");
    //     },100);
    // }

    // update()
    // {
    //     this.goldLabel.string = this.obj.a.toString();
    // }


    //------ 按钮点击事件 ------//
    onBtnShop()
    {
        UIManager.getInstance().openUI(LayerUI, ConstValue.LAYER_UI_ZINDEX);
    }

    onBtnLayer1()
    {
        UIManager.getInstance().showUI(ShopUI);
    }

    onBtnLayer2()
    {
        UIManager.getInstance().showUI(ShopUI);
    }

    onBtnSet()
    {
        GameDataManager.getInstance().getGameData().shopInfo.player.closeAudio = true;
        GameDataManager.getInstance().getGameData().updateShopInfo();
    }

    onBtnGet()
    {
        GameDataManager.getInstance().getGameData().initShopInfo();
        cc.log(GameDataManager.getInstance().getGameData().shopInfo);
    }
}
