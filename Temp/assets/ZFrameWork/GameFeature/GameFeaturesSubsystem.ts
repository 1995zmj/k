import { AssetSubsystem } from "../AssetSubsystem";
import { GameInstance } from "../GameInstance";
import { RegisterClassManager } from "../RegisterManager";
import { ZSubsystem } from "../Subsystem";

export class ZGameFeaturesSubsystem extends ZSubsystem {
    private _bundle: Map<string, cc.AssetManager.Bundle>
    constructor() {
        super();
        this._bundle = new Map()
    }
    public loadGameFeature(bundleName: string, callback?: ()=>void) {
        GameInstance.getInstance().getSubsystem(AssetSubsystem).loadAssetBundle(bundleName, (bundle) => {
            this._bundle.set(bundleName, bundle)
            console.log(bundle)
            console.log(bundle.base)
            let path = cc.path.join(bundle.base, 'script')
            console.log(path)
            RegisterClassManager.getInstance().registerBundleClassRootPath(bundleName, path)
            callback()
        })
    }

    public loadAndActivateGameFeature(bundleName: string, callback: ()=>void) {
        
    }
}