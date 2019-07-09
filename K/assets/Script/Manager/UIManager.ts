import { BaseUI, UIClass, EUIType } from "../UI/BaseUI";
import { ConstValue } from "../Data/ConstValue";

export class UIManager
{
    private static instance: UIManager;
    private uiList: BaseUI[] = [];
    private uiRoot: cc.Node = null;
    
    public static getInstance(): UIManager
    {
        if(this.instance == null)
        {
            this.instance = new UIManager();
        }
        return this.instance;
    }

    constructor()
    {
        this.uiRoot = cc.find("Canvas");
    }

    public openUI<T extends BaseUI>(uiClass: UIClass<T>, zOrder?: number, callback?: Function, onProgress?: Function, ...args: any[])
    {
        if(this.getUI(uiClass))
        {
            return;
        }
        cc.loader.loadRes(
            uiClass.getUrl(),
            (completedCount: number, totalCount: number, item: any)=>
            {
                if(onProgress)
                {
                    onProgress(completedCount, totalCount, item);
                }
            }, 
            (error, prefab)=>
            {
                if(error)
                {
                    cc.log(error);
                    return;
                }
                if(this.getUI(uiClass))
                {
                    return;
                }
                let uiNode: cc.Node = cc.instantiate(prefab);
                uiNode.parent = this.uiRoot;
                if (zOrder) { uiNode.zIndex = zOrder; }
                uiNode.zIndex = zOrder ? zOrder : ConstValue.DEFAULT_UI_ZINDEX;
                let ui = uiNode.getComponent(uiClass) as BaseUI;
                if(!ui)
                {
                    cc.error(uiClass.getUrl());
                }
                ui.tag = uiClass;
                this.uiList.push(ui);
                if(callback)
                {
                    callback(ui, args);
                }
            }
        );
    }

    public closeUI<T extends BaseUI>(uiClass: UIClass<T>)
    {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].tag === uiClass)
            {
                this.uiList[i].node.destroy();
                this.uiList.splice(i, 1);
                return;
            }
        }
    }

    public showUI<T extends BaseUI>(uiClass: UIClass<T>, callback?: Function)
    {
        let ui = this.getUI(uiClass);
        if(ui)
        {
            ui.node.active = true;
            ui.onShow();
            callback&&callback(ui);
        }
        else
        {
            this.openUI(uiClass, ConstValue.DEFAULT_UI_ZINDEX, (ui)=>{
                ui.onShow();
                callback&&callback(ui);
            });
        }
    }

    public hideUI<T extends BaseUI>(uiClass: UIClass<T>)
    {
        let ui = this.getUI(uiClass);
        if(ui)
        {
            ui.node.active = false;
        }
        else
        {
            cc.log("can not find ui" + uiClass);
        }
    }

    public getUI<T extends BaseUI>(uiClass: UIClass<T>): BaseUI
    {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].tag === uiClass)
            {
                return this.uiList[i];
            }
        }
        return null;
    }

    public getUIsByType(uiType: EUIType): BaseUI[]
    {
        let uis: BaseUI[] = [];
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].uiType == uiType && this.uiList[i].node.active)
            {
                uis.push(this.uiList[i]);
            }
        }
        return uis;
    }
}