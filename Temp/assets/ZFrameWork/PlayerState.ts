import { ZActor } from "./Actor";
import { RegisterManager } from "./GameManager/RegisterManager";

export class ZPlayerState extends ZActor
{ 

}

RegisterManager.getInstance().registertActorClass(ZPlayerState)