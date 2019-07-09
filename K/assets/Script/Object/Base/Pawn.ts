const { ccclass, property } = cc._decorator;

@ccclass
export default class Pawn extends cc.Component
{
    speed: cc.Vec2 = cc.v2(0, 0); //移动速度
    maxSpeed: cc.Vec2 = cc.v2(400, 600);//最大移动速度
    gravity: number = -2000;//重力
    drag: number = 1500;
    direction: number = 0;//方向
    jumpSpeed: number = 1800;// 起跳速度


    collisionX: number = 0;//x 碰撞
    collisionY: number = 0;//y 碰撞
    prePosition: cc.Vec2 = cc.Vec2.ZERO;
    preStep: cc.Vec2 = cc.Vec2.ZERO;
    touchingNumber: number = 0;
    isMove: boolean = false;
    jumping: boolean = false;

    onLoad()
    {
        this.collisionX = 0;
        this.collisionY = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();

        this.touchingNumber = 0;
    }

    onEnable()
    {

    }

    onDisable()
    {

    }

    onCollisionEnter(other, self)
    {
        this.node.color = cc.Color.RED;

        this.touchingNumber++;

        // 1st step 
        // get pre aabb, go back before collision
        let otherAabb = other.world.aabb;
        let otherPreAabb = other.world.preAabb.clone();

        let selfAabb = self.world.aabb;
        let selfPreAabb = self.world.preAabb.clone();

        // 2nd step
        // forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb))
        {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax))
            {
                // this.node.x = otherPreAabb.xMax - this.node.parent.x;
                let tempPosition = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMax + selfPreAabb.width * 0.5, 0));
                this.node.x = tempPosition.x;
                this.collisionX = -1;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin))
            {
                // this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                let tempPosition = this.node.parent.convertToNodeSpaceAR(cc.v2(otherPreAabb.xMin - selfPreAabb.width * 0.5, 0));
                this.node.x = tempPosition.x;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        // 3rd step
        // forward y-axis, check whether collision on y-axis
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
                let tempPosition = this.node.parent.convertToNodeSpaceAR(cc.v2(0, otherPreAabb.yMin - selfPreAabb.height - 1));
                this.node.y = tempPosition.y;
                this.collisionY = 1;
            }

            this.speed.y = 0;
            other.touchingY = true;
        }

    }

    //TODO
    //??移动
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
        if (this.collisionY === 0)
        {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y)
            {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
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
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x)
            {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
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
