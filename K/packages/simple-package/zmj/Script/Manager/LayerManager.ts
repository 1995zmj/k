// TODO
export class LayerManager
{
    private static instance: LayerManager;


    static getInstance(): LayerManager
    {
        if (this.instance == null)
        {
            this.instance = new LayerManager();
        }
        return this.instance;
    }


    loadAndInstantiateResource(path: string, uniName: string, parentNode: cc.Node, callback?: Function)
    {
        cc.loader.loadRes(path, (error, prefab)=>{
            if(error)
            {
                cc.log(error);
                return;
            }
            // 防止其他地方已经生成
            if(parentNode.getChildByName(uniName))
            {
                callback && callback();
                return;
            }

            let node: cc.Node = cc.instantiate(prefab);
            node.name = uniName;
            node.parent = parentNode;
            //node.zIndex = 0;

            callback && callback();
        });
    }
}