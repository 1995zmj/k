const { ccclass, property } = cc._decorator;

@ccclass
export default class Pawn extends cc.Component
{
    speed: cc.Vec2 = cc.v2(0, 0); //移动速度
    maxSpeed: cc.Vec2 = cc.v2(2000, 2000);//最大移动速度
    gravity: number = -1000;//重力
    collisionX: number = 0;//x 碰撞
    collisionY: number = 0;//y 碰撞
    direction: number = 0;//方向
    jumpSpeed: number = 300;// 起跳速度
    drag: number = 1000;


    prePosition: cc.Vec2 = cc.Vec2.ZERO;
    preStep: cc.Vec2 = cc.Vec2.ZERO;
    touchingNumber: number = 0;
    isMove: boolean = false;
    jumping: boolean = false;

    onLoad()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }

    onEnable()
    {

    }

    onDisable()
    {

    }

    onKeyPressed(event)
    {
        let keyCode = event.keyCode;
        switch (keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.direction = -1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.direction = 1;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (!this.jumping)
                {
                    this.jumping = true;
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
                break;
        }
    }

    onCollisionEnter(other, self)
    {
        this.node.color = cc.Color.RED;
        this.touchingNumber++;

        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        cc.log(other);

        // if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
        //     if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
        //         this.node.x = otherPreAabb.xMax - this.node.parent.x;
        //         this.collisionX = -1;
        //     }
        //     else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
        //         this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
        //         this.collisionX = 1;
        //     }

        //     this.speed.x = 0;
        //     other.touchingX = true;
        //     return;
        // }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
        {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax))
            {
                // this.node.y = otherPreAabb.yMax - this.node.parent.y;
                let tempPosition = this.node.parent.convertToNodeSpaceAR(cc.v2(0, otherPreAabb.yMax));
                this.node.y = tempPosition.y;
                this.jumping = false;
                this.collisionY = -1;
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin))
            {
                // this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                let tempPosition = this.node.parent.convertToNodeSpaceAR(cc.v2(0, otherPreAabb.yMin - selfPreAabb.height));
                this.node.y = tempPosition.y;
                this.collisionY = 1;
            }

            this.speed.y = 0;
            other.touchingY = true;
        }

    }

    onCollisionStay(other, self)
    {
        if (this.collisionY === -1)
        {
            if (other.node.group === 'Platform')
            {
                var motion = other.node.getComponent('PlatformMotion');
                if (motion)
                {
                    this.node.x += motion._movedDiff;
                }
            }

            // this.node.y = other.world.aabb.yMax;

            // var offset = cc.v2(other.world.aabb.x - other.world.preAabb.x, 0);

            // var temp = cc.affineTransformClone(self.world.transform);
            // temp.tx = temp.ty = 0;

            // offset = cc.pointApplyAffineTransform(offset, temp);
            // this.node.x += offset.x;
        }
    }

    onCollisionExit(other, self)
    {
        this.touchingNumber--;
        if (this.touchingNumber === 0)
        {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX)
        {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY)
        {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    }

    update(dt)
    {
        // if (this.isMove)
        //     return;
        if (this.collisionY === 0)
        {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y)
            {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
            this.node.x += this.speed.x * dt;
            this.node.y += this.speed.y * dt;
        }

        if (this.direction === 0)
        {
            if (this.speed.x > 0)
            {
                this.speed.x -= this.drag * dt;
                if (this.speed.x <= 0) this.speed.x = 0;
            }
            else if (this.speed.x < 0)
            {
                this.speed.x += this.drag * dt;
                if (this.speed.x >= 0) this.speed.x = 0;
            }
        }
        else
        {
            // this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            // if (Math.abs(this.speed.x) > this.maxSpeed.x) {
            //     this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            // }
        }

        if (this.speed.x * this.collisionX > 0)
        {
            this.speed.x = 0;
        }

        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;

        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;


    }

}
