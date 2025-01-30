// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { ZSubsystem } from "../../ZFrameWork/Subsystem";

export class TestGameSubSystem extends ZSubsystem {
    public add(a: number){
        console.log(a)
    }
}
