import { ZPlayerState } from "../../PlayerState";
import { ZGameFrameworkComponentSubsystem } from "../GameFrameworkComponentSubsystem";

export class ZModularPlayerState extends ZPlayerState
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