// import { BaseWorld, WorldClass } from "../World/BaseWorld";
import { ZGameUIManagerSubsystem } from "./GameUIManagerSubsystem";
import { ZClass } from "./Object";
import { ZSubsystem } from "./Subsystem";
// import { Scene } from 'cc';
export class GameInstance
{
    private static instance: GameInstance;
    private subsystemMap: Map<ZClass<ZSubsystem>, ZSubsystem>;
    // private curWorld: BaseWorld;

    public static getInstance(): GameInstance
    {
        if(this.instance == null)
        {
            this.instance = new GameInstance();
        }
        return this.instance;
    } 

    constructor()
    {
        this.subsystemMap = new Map()
    }

    // public changeWorld<T extends BaseWorld>(worldClass: WorldClass<T>, scene: Scene = null)
    // {
    //     let oldWorld = this.curWorld
    //     // TODO 销毁老的world现在还没有好的办法先不晓辉
    //     this.curWorld = new worldClass();
    //     this.curWorld.enter(scene);
    // }

    public getSubsystem<T extends ZSubsystem>(subsystemClass: ZClass<T>): T
    {
        let tempClass = this.subsystemMap.has(subsystemClass);
        if(!tempClass)
        {
            let tempSubsystem = new subsystemClass()
            this.subsystemMap.set(subsystemClass, tempSubsystem);
        }
        return this.subsystemMap.get(subsystemClass) as T;
    }

    // public getSubsystem(subsystemString: string): ZSubsystem
    // {
    //     let tempClass = this.subsystemMap.has(subsystemClass);
    //     if(!tempClass)
    //     {
    //         let tempSubsystem = new subsystemClass()
    //         this.subsystemMap.set(subsystemClass, tempSubsystem);
    //     }
    //     return this.subsystemMap.get(subsystemClass) as T;
    // }

    public addLocalPlayer(): void
    {
        this.getSubsystem(ZGameUIManagerSubsystem).notifyPlayerAdded()
    }

    public removeLocalPlayer(): void
    {
        this.getSubsystem(ZGameUIManagerSubsystem).notifyPlayerRemoved()
    }
}