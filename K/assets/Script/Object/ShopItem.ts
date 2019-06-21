import ListViewItem from "../Util/ListView/ListViewItem";
import { ConfigManager } from "../Manager/ConfigManager";
import Animal from "./Animal";
import { AnimalData, AnimalConfigContainer } from "../Config/AnimalConfigContainer";
import { GameDataManager } from "../Manager/GameDataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopItem extends ListViewItem
{
    @property(cc.SpriteAtlas)
    animalSpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Sprite)
    animalSprite: cc.Sprite = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    animalData: AnimalData[] = [];

    onLoad()
    {
        let container = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
        this.animalData = container.getAnimalConfigData();
    }

    updateItem(i, j)
    {
        // this.nameLabel.string = i + "," + j;
        this.animalSprite.spriteFrame = this.animalSpriteAtlas.getSpriteFrame(this.animalData[j].name);
        this.nameLabel.string = this.animalData[j].name;
        this.priceLabel.string = this.animalData[j].price.toString();
    }

    onBtnBuy()
    {
        cc.log("buy");
        GameDataManager.getInstance().getGameData().buyAnimal(this.itemID);
    }
}
