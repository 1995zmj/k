const {ccclass, property} = cc._decorator;
 
enum WallType 
{
    Left,
    Right,
    Top,
    Bottom,
}
 
@ccclass
export default class NewClass extends cc.Component {

    @property({
        type: cc.Enum(WallType)
    })
    type: WallType = WallType.Top;

    @property()
    width:number = 5

    start(){
        // var collider = this.getComponent(cc.BoxCollider);
        // if (!collider) {
        //     return;
        // }
        
        // var node = this.node;
        // var type = this.type;
        
        // var width = cc.winSize.width;
        // var height = cc.winSize.height;
        
        // var wallWidth = this.width;
        
        // if (type === WallType.Left) {
        //     node.height = height;
        //     node.width = wallWidth;
        //     node.x = 0;
        //     node.y = height/2;
        // }
        // else if (type === WallType.Right) {
        //     node.height = height;
        //     node.width = wallWidth;
        //     node.x = width;
        //     node.y = height/2;
        // }
        // else if (type === WallType.Top) {
        //     node.width = width;
        //     node.height = wallWidth;
        //     node.x = width/2;
        //     node.y = height;
        // }
        // else if (type === WallType.Bottom) {
        //     node.width = width;
        //     node.height = wallWidth;
        //     node.x = width/2;
        //     node.y = 0;
        // }
        
        // collider.size = node.getContentSize();
    }
}
