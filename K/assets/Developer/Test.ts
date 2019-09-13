const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.JsonAsset)
    json: cc.JsonAsset = null;



    onLoad () {

        let map:{[key:number] : object} = {};
        cc.log(this.json);
        let array = this.json.json;
        let object = this.json.json;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                map[key] = element;
                cc.log(element);
            }
        }
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            cc.log(element);
        }
        cc.log(map);

    }

    start () {

    }

    // update (dt) {}
}
