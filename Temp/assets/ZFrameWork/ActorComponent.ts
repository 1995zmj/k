import { GameInstance } from "./GameInstance";
import { ZObject } from "./Object";
import { ZWorld } from "./World";

export class ZActorComponent extends ZObject {
    _world: ZWorld = null
    public init() {
        this._world = GameInstance.getInstance().getWorld()
    }

    public initLate() {

    }
}