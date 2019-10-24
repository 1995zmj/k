const {ccclass, property} = cc._decorator;

@ccclass
export default class Grid extends cc.Component {
    
    @property(cc.ParticleSystem)
    particleSystem:cc.ParticleSystem = null;

    tempY = 0;

    onLoad()
    {

    }

    onEnable()
    {
        if (this.particleSystem.particleCount > 0) { // check if particle has fully plaed

        } else {
            this.particleSystem.resetSystem(); // restart particle system
            this.particleSystem.node.setPosition(cc.Vec2.ZERO);
            this.tempY = 0;
        }
    }

    update(dt)
    {
        if(this.tempY < 10)
        {
            this.particleSystem.node.position.y = this.tempY;
            this.tempY += dt;
        }
    }

    onDisable()
    {
        this.particleSystem.stopSystem(); // stop particle system
    }


}
