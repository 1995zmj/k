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
import { ListenerManager } from "../Manager/ListenerManager";
import { ListenerType } from "../Data/ListenerType";
import LayerUI from "./LayerUI";
import { ConstValue } from "../Data/ConstValue";
import { EUnitInfoType } from "../Data/Info/WarPlatformInfo";

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
        this.initWarPlatformInfo();
    }

    update(dt)
    {
        ListenerManager.getInstance().emit(ListenerType.LoopUpdate, dt);
    }


    initMap() {
        let nodePool = PoolManager.getInstance().getNodePool(GridNodePool) as GridNodePool;
        let container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;
        let data = container.getGridConfigData();

        for (let index = data.length - 1; index >= 0; index--) {
            let node = nodePool.get();

            const element = data[index];
            node.position = container.getPosition(element.id);

            node.parent = this.mapLayer;
        }
    }


    initWarPlatformInfo()
    {

        let animalContainer = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
        let animalData = animalContainer.getAnimalConfigData();
        let animalNodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;
        let gridNodePool = PoolManager.getInstance().getNodePool(GridNodePool) as GridNodePool;

        let warPlatformInfo = GameDataManager.getInstance().getGameData().warPlatformInfo;
        let array = warPlatformInfo.unitInfoList;
        cc.log(array.length);
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            //Animal
            if(element.unitInfo.unitInfoType == EUnitInfoType.ANIMAL)
            {
                let node = animalNodePool.get();
                (node.getComponent(Animal) as Animal).init(animalData[index].name);
                node.position = GridHelp.getGridPosition(index);
                node.parent = this.animalLayer;
            }

            //Grid
            let node = gridNodePool.get();
            node.position = GridHelp.getGridPosition(index);
            node.parent = this.mapLayer;
        }

    }


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

    onBtnBuy()
    {

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
        GameDataManager.getInstance().getGameData().updateShopInfo();
    }

    onBtnGet()
    {
        
        var time = 40;
        console.log((Array(2).join("0")+time).slice(-2));

        GameDataManager.getInstance().getGameData().initShopInfo();
        cc.log(GameDataManager.getInstance().getGameData().shopInfo);
    }
}
