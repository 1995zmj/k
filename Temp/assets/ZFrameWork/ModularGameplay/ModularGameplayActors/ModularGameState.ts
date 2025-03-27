import { ZGameState } from "../../GameState";
import { ZGameFrameworkComponentSubsystem } from "../GameFrameworkComponentSubsystem";

export class ZModularGameState extends ZGameState
{ 
    public preInitializeComponents(){
        super.preInitializeComponents()
        ZGameFrameworkComponentSubsystem.AddGameFrameworkComponentReceiver(this)
    }

    public beginPlay(){
        ZGameFrameworkComponentSubsystem.sendGameFrameworkComponentExtensionEvent(this, 'GameActorReady')
        super.beginPlay()
    }

    public endPlay(){
        ZGameFrameworkComponentSubsystem.removeGameFrameworkComponentReceiver(this)
        super.endPlay()
    }
}