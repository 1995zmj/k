
export class Delegate<T extends (...args: any[]) => void = () => void> {
    private _listeners: Array<{
        func: T;
        context?: any;  // 存储上下文
        once?: boolean;
    }> = [];

    // 添加方法时传入上下文
    public add(func: T, context?: any, once?: boolean): void {
        if (typeof func !== 'function') {
            throw new Error('Delegate.add: 参数必须是一个函数');
        }
        // 检查是否已存在相同函数和上下文
        const exists = this._listeners.some(
            item => item.func === func && item.context === context
        );
        if (!exists) {
            this._listeners.push({ func, context, once });
        }
    }

    // 调用时动态绑定上下文
    public broadcast(...args: Parameters<T>): void {
        const listenersToCall = [...this._listeners];
        this._listeners = this._listeners.filter(item => !item.once);

        listenersToCall.forEach(({ func, context }) => {
            try {
                const boundFunc = context ? func.bind(context) : func;
                boundFunc(...args);
            } catch (error) {
                console.error('Delegate.broadcast 执行出错:', error);
            }
        });
    }

    // 移除时需要匹配函数和上下文
    public remove(func: T, context?: any): void {
        this._listeners = this._listeners.filter(
            item => !(item.func === func && item.context === context)
        );
    }
}

export class DelegateManager {
    private static instance: DelegateManager;

    public static getInstance(): DelegateManager {
        if (this.instance == null) {
            this.instance = new DelegateManager();
        }
        return this.instance;
    }

    constructor() {
    }

    public Create() {
        return new Delegate()
    }

}