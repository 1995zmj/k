import { ZSubsystem } from "./Subsystem";

export class AssetSubsystem extends ZSubsystem {
    // TODO 还没有销毁 这个还是有点问题的
    private prefabMap: Map<string, cc.Prefab>;
    constructor() {
        super();
        console.log("AssetSubsystem create");
        this.prefabMap = new Map();
    }

    public loadPrefab(prefabPath: string, callback: (prefabClass: cc.Prefab) => void) {
        let tempPrefab = this.prefabMap.get(prefabPath);
        if (tempPrefab) {
            callback(tempPrefab);
        }
        else {
            cc.resources.load(prefabPath, cc.Prefab, (err, prefab) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // this.prefabMap.set(prefabPath, prefab);
                callback(prefab);
            });
        }
    }

    public loadPrefabPromise(prefabPath: string): Promise<cc.Prefab> {
        return new Promise((resolve)=>{
            let tempPrefab = this.prefabMap.get(prefabPath);
            if (tempPrefab) {
                resolve(tempPrefab)
            }
            else {
                cc.resources.load(prefabPath, cc.Prefab, (err, prefab) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    this.prefabMap.set(prefabPath, prefab);
                    resolve(tempPrefab)
                });
            }
        })
    }


    public loadAssetBundle(assetBundleName:string, callback: (bundle)=> void)
    {
        cc.assetManager.loadBundle(assetBundleName, (err, bundle)=>{
            callback(bundle)
        })
    }
}