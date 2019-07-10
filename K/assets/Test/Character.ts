import Pawn from "./Base/Pawn";
import InputComponent from "./Base/InputComponent";


export enum ECharacterState
{
    stand,
    walk,
    jump,
}


const { ccclass, property } = cc._decorator;

@ccclass
export default class Character extends Pawn
{

    @property(cc.Animation)
    animation: cc.Animation = null;

    state: ECharacterState = ECharacterState.stand;

    onLoad()
    {
        this.initInput();
    }

    start()
    {
    }

    initInput()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }

    onKeyPressed(event)
    {
        let keyCode = event.keyCode;
        switch (keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.direction = -1;
                this.walk();
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.direction = 1;
                this.walk();
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (!this.jumping)
                {
                    this.jumping = true;
                    this.jump();
                    this.speed.y = this.jumpSpeed;
                }
                break;
        }
    }


    onKeyReleased(event) 
    {
        let keyCode = event.keyCode;
        switch (keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.direction = 0;
                this.stand();
                break;
        }
    }

    stand()
    {

        switch (this.state)
        {
            case ECharacterState.stand:
                
                break;
            case ECharacterState.walk:
                this.animation.play("Y_Stand");
                this.state = ECharacterState.stand;
                break;
            case ECharacterState.jump:

                break;
            default:
                break;
        }
        
    }

    walk()
    {
        switch (this.state)
        {
            case ECharacterState.stand:
                this.animation.play("Y_Walk");
                this.state = ECharacterState.walk;
                this.animation.node.scaleX = this.direction;

                break;
            case ECharacterState.walk:

                break;
            case ECharacterState.jump:

                break;
            default:
                break;
        }
    }

    jump()
    {
        switch (this.state)
        {
            case ECharacterState.stand:
                this.animation.play("Y_Jump");

                break;
            case ECharacterState.walk:
                this.animation.play("Y_Jump");

                break;
            case ECharacterState.jump:

                break;
            default:
                break;
        }
    }






    // update (dt) {}
}
