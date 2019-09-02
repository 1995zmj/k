
import { BaseUI } from "../../../GameplayerFrame/Script/UI/BaseUI";
import { ListenerManager } from "../../../GameplayerFrame/Script/Manager/ListenerManager";
import { ListenerType } from "../../../GameplayerFrame/Script/Data/ListenerType";
import { ConfigManager } from "../../../GameplayerFrame/Script/Manager/ConfigManager";
import { PoolManager } from "../../../GameplayerFrame/Script/Manager/PoolManager";
import { GameDataManager } from "../../../GameplayerFrame/Script/Manager/GameDataManager";
import { UIManager } from "../../../GameplayerFrame/Script/Manager/UIManager";
import { PlatformUnitInfo } from "../../Common/Script/Data/Info/WarPlatformInfo";
import ShopUI from "../ShopUI/ShopUI";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUI extends BaseUI
{
    protected static className = "MainUI";

    @property(cc.Node)
    private gridLayer: cc.Node = null;
    @property(cc.Node)
    private animalLayer: cc.Node = null;

    @property(cc.Label)
    private goldLabel: cc.Label = null;
    @property(cc.SpriteFrame)
    private spriteFrame: cc.SpriteFrame = null;

    onLoad()
    {
        ListenerManager.getInstance().on(ListenerType.OnGetAnimal, this.onGetAnimal,this);
    }

    start()
    {
        this.initWarPlatformInfo();
    }

    // update(dt)
    // {
    //     ListenerManager.getInstance().emit(ListenerType.LoopUpdate, dt);
    // }

    initWarPlatformInfo()
    {
        // let animalContainer = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
        // let animalData = animalContainer.getAnimalConfigData();

        // let animalNodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;
        // let gridNodePool = PoolManager.getInstance().getNodePool(GridNodePool) as GridNodePool;

        // let warPlatformInfo = GameDataManager.getInstance().getGameData().warPlatformInfo;
        // let array = warPlatformInfo.PlatformUnitInfoList;

        // for (let index = 0; index < array.length; index++)
        // {
        //     const element = array[index];

        //     //Animal
        //     if (element.unitInfo.unitInfoType == EUnitInfoType.ANIMAL)
        //     {
        //         let node = animalNodePool.get();
        //         (node.getComponent(Animal) as Animal).init(element);
        //         node.parent = this.animalLayer;
        //     }

        //     //Grid
        //     let node = gridNodePool.get();
        //     node.position = GridHelp.getGridPosition(index);
        //     node.parent = this.gridLayer;
        // }
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

    //------ 监听回调 ------//
    onGetAnimal(platformUnitInfo: PlatformUnitInfo)
    {
        // cc.log(platformUnitInfo);
        
        // let animalNodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;
        // let node = animalNodePool.get();
        // (node.getComponent(Animal) as Animal).init(platformUnitInfo);
        // node.parent = this.animalLayer;
    }


    //------ 按钮点击事件 ------//
    onBtnBuy()
    {
        GameDataManager.getInstance().getGameData().buyAnimal(2);
    }

    onBtnShopU()
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
        console.log((Array(2).join("0") + time).slice(-2));

        GameDataManager.getInstance().getGameData().initShopInfo();
        cc.log(GameDataManager.getInstance().getGameData().shopInfo);
    }
}
