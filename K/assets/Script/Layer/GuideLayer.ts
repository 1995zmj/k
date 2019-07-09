const {ccclass, property} = cc._decorator;

@ccclass
export default class GuidLayer extends cc.Component {

    // @property(cc.Node)
    // maskNodeList: cc.Node[] = [];
    // @property(cc.Node)
    // maskUI: cc.Node
    // @property(cc.Node)
    // hand: cc.Node

    // @property(cc.Node)
    // target: cc.Node = null;

    // onLoad()
    // {
    //     this.init(this.target.getBoundingBoxToWorld())
    // }

    // //世界指标
    // init(worldBox: cc.Rect)
    // {
    //     //mask
    //     let tempPosition: cc.Vec2[] = [];
    //     tempPosition.push(this.node.convertToNodeSpaceAR(cc.v2(0,worldBox.yMax)));
    //     tempPosition.push(this.node.convertToNodeSpaceAR(cc.v2(worldBox.xMin,0)));
    //     tempPosition.push(this.node.convertToNodeSpaceAR(cc.v2(worldBox.xMax,0)));
    //     tempPosition.push(this.node.convertToNodeSpaceAR(cc.v2(0,worldBox.yMin)));
    //     for (let index = 0; index < tempPosition.length; index++) {
    //         const element = tempPosition[index];
    //         this.maskNodeList[index].setPosition(element);
    //     }

    //     //ui
    //     this.maskUI.setContentSize(worldBox.size);
    //     let pos = this.maskUI.parent.convertToNodeSpaceAR(cc.v2(worldBox.x+worldBox.width/2,worldBox.y+worldBox.height/2));
    //     this.maskUI.setPosition(pos);
    //     this.hand.setPosition(pos);
    // }

}
