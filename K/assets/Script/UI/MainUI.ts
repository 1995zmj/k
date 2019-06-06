import { BaseUI } from "./BaseUI";
import { ConfigManager } from "../Manager/ConfigManager";
import { GridConfigContainer } from "../Config/GridConfigContainer";
import { PoolManager } from "../Manager/PoolManager";
import { GridNodePool } from "../Pool/GridNodePool";
import { AnimalNodePool } from "../Pool/AnimalNodePool";
import { GridHelp } from "../Util/GridHelp";

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
        this.initMap();
        this.initAnimal();
    }


    initMap()
    {
        let nodePool = PoolManager.getInstance().getNodePool(GridNodePool) as GridNodePool;
        let Container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;
        let data = Container.getGridConfigData();

        for (let index = data.length - 1; index >= 0; index--)
        {
            let node = nodePool.get();

            const element = data[index];
            node.position = Container.getPosition(element.id);

            node.parent = this.mapLayer;
        }
    }

    initAnimal()
    {
        let nodePool = PoolManager.getInstance().getNodePool(AnimalNodePool) as AnimalNodePool;

        for (let index = 10; index >= 0; index--)
        {
            let node = nodePool.get();

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

}
