
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    id:number = 2;
    sum:number = 3;
    @property(cc.Node)
    targetNode:cc.Node = null;

    speed: number = 50;
    baseR: number = 3.14/6;
    dis:number = 0;

    start()
    {
    }

    update(dt)
    {
        let p = this.targetNode.position.sub(this.node.position);
        p.normalizeSelf();
        p.mulSelf(this.speed * dt);
        if(this.dis > 200)
        {

        }
        else
        {
            p.rotateSelf(this.baseR * this.id  - this.baseR);
        }

        this.dis += p.mag();
        
        this.node.x += p.x;
        this.node.y += p.y;

    }
}
