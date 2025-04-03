import { ZGameMode } from "./GameMode";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass, ZObject } from "./Object";
import { ZSubsystem } from "./Subsystem";
import { ZWorld } from "./World";

export class GameInstance {
    private static _instance: GameInstance;

    // private _objectList: Array<ZObject> = new Array()
    // private _lateDestroys: Array<ZObject> = new Array()
    // // 给每个生成的实例一个uid  显示比较简单的++
    // private _uidIndex: number = -1
    // private _uidToIndex: Map<number, number> = new Map()
    // public getNextUid() {
    //     return ++this._uidIndex
    // }

    private _subsystemMap: Map<ZClass<ZSubsystem>, ZSubsystem> = new Map()

    private _curWorld: ZWorld
    private _globalCustomData: any = {}

    public static getInstance(): GameInstance {
        if (this._instance == null) {
            this._instance = new GameInstance();
        }
        return this._instance;
    }

    constructor() {
    }

    

    public newObject<T extends ZObject>(objectClass: ZClass<T>): T {
        let tempObject = new objectClass()
        // let temp_uid = this.getNextUid()
        // tempObject.uid = temp_uid
        // let temp_index = this._objectList.push(tempObject) - 1
        // if (this._uidToIndex.has(temp_uid)) {
        //     console.log("error uid rand")
        //     return
        // }
        // this._uidToIndex.set(tempObject.uid, temp_index)
        return tempObject
    }

    public destroyObject<T extends ZObject>(object: T): void {
        object.destroy()
        // let temp_uid = object.uid
        // let object_index = this._uidToIndex.get(temp_uid)
        // if (object_index && this._objectList.length > object_index) {
        //     let lastIndex = this._objectList.length - 1
        //     if (object_index != lastIndex) {
        //         // 如果是中间的 和最后一个交互
        //         let lastObject = this._objectList.pop()
        //         this._objectList[object_index] = lastObject
        //         this._uidToIndex[lastObject.uid] = object_index
        //     }
        //     else {
        //         // 最后一个直接弹出
        //         this._objectList.pop()
        //     }
        //     this._uidToIndex.delete(temp_uid)
        //     this._lateDestroys.push(object)
        // }
        // else {
        //     console.error("error destory actor is none")
        // }
    }

    public tryChangeScence(scenceName: string, customData: any = {})
    {
        if (this._curWorld) {
            this._curWorld.destroy()
            this._curWorld = null
        }
        this._globalCustomData = customData
        cc.director.loadScene(scenceName)
    }

    public getGlobalCustomData(){
        return this._globalCustomData
    }

    public changeWorld(worldNode: cc.Node) {
        if (this._curWorld) {
            this._curWorld.destroy()
            this._curWorld = null
        }
        this._curWorld = this.newObject<ZWorld>(ZWorld)
        this._curWorld.rootNode = worldNode
    }

    public getWorld(): ZWorld {
        return this._curWorld
    }

    public getGameMode(): ZGameMode {
        return this._curWorld.gameMode
    }

    public getSubsystem<T extends ZSubsystem>(subsystemClass: ZClass<T>): T {
        if (!this._subsystemMap.has(subsystemClass)) {
            let tempSubsystem = this.newObject(subsystemClass)
            this._subsystemMap.set(subsystemClass, tempSubsystem);
        }
        return this._subsystemMap.get(subsystemClass) as T
    }

    public addLocalPlayer(): void {
        this.getSubsystem(ZGameUIManagerSubsystem).notifyPlayerAdded()
    }

    public removeLocalPlayer(): void {
        this.getSubsystem(ZGameUIManagerSubsystem).notifyPlayerRemoved()
    }

    //  这里应该是最初的入口了
    public initializeForPlay() {
        //  这里创建world
        //  加载worldsetting
    }

    public startPlay() {
        // 读取配置，创建gamemode
        //world设置gamemode  setGamemode -> this.creategameode

        // 初始化actor

        // gamemode 调用initgame
    }

    //  这里是创建 gamemode
    public createGameMode(inWorld: ZWorld) {

    }
}