const { ccclass, property } = cc._decorator;

@ccclass
export default class ListViewItem extends cc.Component
{
    itemID: number = 0;

    onLoad()
    {

    }

    start()
    {

    }

    updateItem(i,j)
    {
        cc.log(i,j);
    }
}
