import { ConfigManager } from "../../GameplayerFrame/Script/Manager/ConfigManager";
import { AnimalConfigContainer } from "../Config/AnimalConfigContainer";
import { AnimalUnitInfo, PlatformUnitInfo } from "../Data/Info/WarPlatformInfo";
import { GridHelp } from "../Util/GridHelp";

const { ccclass, property } = cc._decorator;

export enum AnimalStateType
{
    NONE,
    IDLE,
    GOODTIME,
    PERFECTTIME,
    MOVE,
    ATTACK,
    DRAG,
    MERGE,
}

@ccclass
export default class Animal extends cc.Component
{
    @property(cc.SpriteAtlas)
    animalSpriteAtlas: cc.SpriteAtlas = null;

    @property(cc.Sprite)
    animalSprite: cc.Sprite = null;

    positionIndex: number = -1;

    private _state: AnimalStateType = AnimalStateType.NONE;
    public get state(): AnimalStateType
    {
        return this._state;
    }
    public set state(stateType)
    {
        if (this._state == stateType)
            return;

        switch (stateType)
        {
            case AnimalStateType.IDLE:
                this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
                this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
                break;
            default:
                break;
        }
        this._state = stateType;
    }

    init(platformUnitInfo: PlatformUnitInfo)
    {
        this.state = AnimalStateType.IDLE;

        let animalContainer = ConfigManager.getInstance().getConfig(AnimalConfigContainer) as AnimalConfigContainer;
        let animalData = animalContainer.getAnimalConfigData();
        let unitInfo = (platformUnitInfo.unitInfo) as AnimalUnitInfo;

        // 位置信息
        this.positionIndex = platformUnitInfo.index;
        // 图片形象
        this.animalSprite.spriteFrame = this.animalSpriteAtlas.getSpriteFrame(animalData[unitInfo.id].name);
        // 更新位置
        this.updatePosition();
    }


    onTouchStart(event: cc.Event.EventTouch)
    {
        this.state = AnimalStateType.DRAG;
        this.node.zIndex = 100;
    }

    onTouchMove(event: cc.Event.EventTouch)
    {
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
    }

    onTouchEnd(event: cc.Event.EventTouch)
    {
        this.state = AnimalStateType.IDLE;
        this.updatePosition();
    }

    onTouchCancel()
    {

    }

    updatePosition()
    {
        cc.log("index", this.positionIndex);
        this.node.zIndex = this.positionIndex;
        this.node.position = GridHelp.getGridPosition(this.positionIndex);
    }


    unuse()
    {

    }

    reuse()
    {
        cc.log("ok");
    }
}
