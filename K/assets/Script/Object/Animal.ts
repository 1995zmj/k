const { ccclass, property } = cc._decorator;

@ccclass
export default class Animal extends cc.Component
{
    @property(cc.SpriteAtlas)
    animalSpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Sprite)
    animalSprite: cc.Sprite = null;

    init(name:string)
    {
        this.animalSprite.spriteFrame = this.animalSpriteAtlas.getSpriteFrame(name);
    }

    unuse()
    {

    }

    reuse()
    {
        cc.log("ok");
    }
}
