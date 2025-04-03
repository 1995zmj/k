type ListenerOptions = {
    context?: unknown;
    once?: boolean;
};

export class Delegate<T extends (...args: any[]) => void = () => void> {
    private static readonly instances = new Map<string, Delegate<any>>();

    private _listeners: Array<{
        func: T;
        context?: unknown;
        once?: boolean;
    }> = [];

    /**
   * 工厂方法 - 创建或获取委托实例
   * @param identifier 可选唯一标识符（用于单例模式）
   */
    static create<T extends (...args: any[]) => void>(
        identifier?: string
    ): Delegate<T> {
        if (identifier) {
            if (!this.instances.has(identifier)) {
                this.instances.set(identifier, new Delegate<T>());
            }
            return this.instances.get(identifier) as Delegate<T>;
        }
        return new Delegate<T>();
    }

    private _listenerCache?: Map<T, Set<unknown>>; // 用于快速查找的缓存

    // 自定义错误处理器（可选）
    public static errorHandler: (error: unknown) => void = (error) => {
        console.error('Delegate execution error:', error);
    };

    add(func: T, options?: ListenerOptions | unknown): this {
        const { context, once } = this.parseOptions(options);

        // 检查重复注册
        if (!this._listeners.some(l => l.func === func && l.context === context)) {
            this._listeners.push({ func, context, once });
        }
        return this;
    }

    /**
   * 解析参数重载
   */
    private parseOptions(options?: ListenerOptions | unknown): {
        context?: unknown;
        once?: boolean;
    } {
        if (typeof options === 'object' && options !== null) {
            return options as ListenerOptions;
        }
        return { context: options };
    }

    remove(func: T, context?: unknown): void {
        const initialLength = this._listeners.length;

        this._listeners = this._listeners.filter(item =>
            !(item.func === func && item.context === context)
        );

        // 更新缓存
        if (initialLength !== this._listeners.length) {
            const contexts = this._listenerCache?.get(func);
            if (contexts) {
                contexts.delete(context);
                if (contexts.size === 0) {
                    this._listenerCache?.delete(func);
                }
            }
        }
    }

    broadcast(...args: Parameters<T>): void {
        this._listeners.forEach(listener => {
          try {
            // 关键：使用 call 绑定上下文
            listener.func.call(listener.context, ...args);
          } catch (error) {
            console.error('Delegate execution error:', error);
          }
        });
    
        // 清理一次性监听器
        this._listeners = this._listeners.filter(l => !l.once);
      }

    has(func: T, context?: unknown): boolean {
        return this._listeners.some(
            item => item.func === func && item.context === context
        );
    }

    clear(): void {
        this._listeners = [];
        this._listenerCache?.clear();
    }

    get count(): number {
        return this._listeners.length;
    }
}