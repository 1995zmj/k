import ListViewItem from "../Util/ListView/ListViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends ListViewItem
{
    @property(cc.Sprite)
    animalSprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    updateItem(i, j)
    {
        this.nameLabel.string = i + "," + j;
    }
}
