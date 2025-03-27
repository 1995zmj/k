import { ZGameMode } from "./GameMode";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass, ZObject } from "./Object";
import { ZSubsystem } from "./Subsystem";
import { ZWorld } from "./World";

export class GameInstance {
    private static _instance: GameInstance;
    private _subsystemMap: Map<ZClass<ZSubsystem>, ZSubsystem>;
    private _objectList: Array<ZObject>;
    private _curWorld: ZWorld

    public static getInstance(): GameInstance {
        if (this._instance == null) {
            this._instance = new GameInstance();
        }
        return this._instance;
    }

    constructor() {
        this._subsystemMap = new Map()
        this._objectList = new Array()
    }

    public newObject<T extends ZObject>(objectClass: ZClass<T>): T {
        let tempObject = new objectClass()
        this._objectList.push(tempObject)
        return tempObject as T
    }

    public changeWorld(worldNode: cc.Node) {
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
    public initializeForPlay(){
        //  这里创建world
        //  加载worldsetting
    }


    public startPlay()
    {
        // 读取配置，创建gamemode
        //world设置gamemode  setGamemode -> this.creategameode

        // 初始化actor

        // gamemode 调用initgame
    }

    //  这里是创建 gamemode
    public createGameMode(inWorld: ZWorld) {

    }
}