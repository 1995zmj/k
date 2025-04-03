import { Delegate } from "../ZFrameWork/GameManager/Delegate";
import { ZSubsystem } from "../ZFrameWork/Subsystem";
import { ZWorld } from "../ZFrameWork/World";

export interface IActionHandler<TConfig = any> {
    /** 逻辑执行方法（可异步） */
    execute(context: GameContext, config: TConfig, delegate: Delegate<() => void>): Promise<void> | void;
    /** 配置解析方法（将 item_data 转换为逻辑所需结构） */
    parseConfig(rawItem: any): TConfig;
}

export interface ActionHandlerClass<T extends IActionHandler>
{
    new(): T;
}


export class GameContext {
    constructor(
        public world: ZWorld
    ) { }
}

// HandlerRegistry.ts
export class ZActionHandlerSubsystem extends ZSubsystem {
    private handlers = new Map<number, IActionHandler>();

    // 
    register(type:number, handlerClass: ActionHandlerClass<IActionHandler>) {
        if (this.handlers.has(type)) {
            throw new Error(`类型 ${type} 的处理器已存在`);
        }
        this.handlers.set(type, new handlerClass());
    }

    // 获取处理器（带安全检查）
    getHandler(type: number): IActionHandler {
        const handler = this.handlers.get(type);
        if (!handler) throw new Error(`未注册的类型处理器: ${type}`);
        return handler;
    }

    // 批量执行处理器
    async executeAll(context: GameContext, items: any[], delegate: Delegate<() => void>) {
        for (const item of items) {
            const handler = this.getHandler(item.type);
            const config = handler.parseConfig(item);
            await handler.execute(context, config, delegate);
        }
    }
}