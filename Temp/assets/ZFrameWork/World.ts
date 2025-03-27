import { ZActor, ZActorClass } from "./Actor"
import { AssetSubsystem } from "./AssetSubsystem";
import { GameModeData, GameModetConfigContainer } from "./DefinitionConfidg/GameModeConfigContainer";
import { GameInstance } from "./GameInstance";
import { RegisterManager } from "./GameManager/RegisterManager"
import { ZGameMode } from "./GameMode";
import { ZObject } from "./Object"

export class ZWorld extends ZObject {
    protected _rootNode: cc.Node

    private _actorList: Array<ZActor> = new Array()
    private _lateDestroyActors: Array<ZActor> = new Array()
    private _uidToIndex: Map<number, number> = new Map()

    private _gameMode: ZGameMode
    private _curGameModeData: GameModeData

    // 给每个生成的实例一个uid  显示比较简单的++
    private _uidIndex: number = -1

    public set rootNode(node: cc.Node) {
        this._rootNode = node
    }

    public get gameMode(): ZGameMode {
        return this._gameMode
    }

    public getNextUid() {
        return ++this._uidIndex
    }

    public setGameConfig(config: GameModetConfigContainer) {
        this._curGameModeData = config.getData()
        let gameModeClassString = this._curGameModeData.gameModeClassString
        this._gameMode = this.spawnActorByName<ZGameMode>(gameModeClassString)
        this._gameMode.preInitializeComponents()
        this._gameMode.init()
    }

    public spawnActorByName<T extends ZActor>(actorClassName: string): T {
        const tempClass = RegisterManager.getInstance().getActorClassByName<T>(actorClassName)
        return this.spawnActor<T>(tempClass)
    }

    public DestroyActor<T extends ZActor>(actor: T) {
        let temp_uid = actor.uid
        let actor_index = this._uidToIndex.get(temp_uid)
        if (actor_index && this._actorList.length > actor_index) {
            let lastIndex = this._actorList.length - 1
            if (actor_index != lastIndex) {
                // 如果是中间的 和最后一个交互
                let lastActor = this._actorList.pop()
                this._actorList[actor_index] = lastActor
                this._uidToIndex[lastActor.uid] = actor_index
            }
            else {
                // 最后一个直接弹出
                this._actorList.pop()
            }
            this._uidToIndex.delete(temp_uid)
            this._lateDestroyActors.push(actor)
        }
        else {
            console.error("error destory actor is none")
        }

    }

    public spawnActor<T extends ZActor>(actorClass: ZActorClass<T>): T {
        const tempActor = new actorClass()
        let temp_index = this._actorList.push(tempActor) - 1
        let temp_uid = tempActor.uid
        if (this._uidToIndex.has(temp_uid)) {
            console.log("error uid rand")
            return
        }
        this._uidToIndex.set(tempActor.uid, temp_index)
        this._rootNode.addChild(tempActor.rootNode)

        if (actorClass.prefabPath != "") {
            // TODO 这里加载有问题 要对prefab资源缓存 不要每次都异步加载 还有在加载界面先加载好
            GameInstance.getInstance().getSubsystem(AssetSubsystem).loadPrefab(actorClass.prefabPath, (prefab) => {
                console.log(prefab)
                // 通过 uid 来判断一下对应的 actor 是不是还有效
                let actor_index = this._uidToIndex.get(temp_uid)
                if (actor_index && this._actorList.length > actor_index) {
                    let node: cc.Node = cc.instantiate(prefab);
                    tempActor.initNode(node)
                }
                else {
                    console.error("创建失败， ", actorClass.prefabPath)
                }
            })
        }
        return tempActor as T
    }

    public getAllActor(): Array<ZActor> {
        return this._actorList
    }

    public getAllActorByClass<T extends ZActor>(actorClass: ZActorClass<T>): Array<ZActor> {
        let tempList = []
        for (const actor in this._actorList) {
            if (actor.constructor == actorClass) {
                tempList.push(actor)
            }
        }
        return tempList
    }

    // 这个应该是localplay初始完之后，要看是创建actor，gamemode 也是actor
    public initializeActorsForPlay() {

    }

    public initLate() {
        this._gameMode.initLate()
    }

    public update(dt) {
        this._gameMode && this._gameMode.update(dt)
    }
}