import { ZActor } from "../ZFrameWork/Actor";
import { RoundData } from "./MainGameState";


export default class ZHero extends ZActor {
    public static prefabPath: string = 'actor/P_Hero';

    _canMove: boolean = false

    public set canMove(v: boolean) {
        this._canMove = v;
    }

    public get canMove(): boolean {
        return this._canMove
    }

    public testtt(){
        console.log('nihao')
    }


}
