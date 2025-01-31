import { CommonUserWidgetClass, ZCommonUserWidget } from "./CommonUserWidget";
import { ZClass, ZObject } from "./Object";


export async function loadModule(scriptPath, cb: (temp_module) => void) {
    try {
        // 使用 import() 函数动态加载模块
        const module = await import(scriptPath);
        console.log(module)
        cb(module)

        // // 调用模块中的函数或使用模块中的属性
        // const temp_class = module.G101GameLayout
        // let ins = new temp_class();
        // ins.test_pr()
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}

export class RegisterManager {
    private static instance: RegisterManager;
    // private curWorld: BaseWorld;

    public static getInstance(): RegisterManager {
        if (this.instance == null) {
            this.instance = new RegisterManager();
        }
        return this.instance;
    }

    // private typeToClassName: Map<string, string> = new Map();
    // private classNameToClass: Map<string, ZObject> = new Map();
    private bundleScriptRootPath: Map<string, string> = new Map();

    constructor() {
        // this.typeToClassName = new Map();
        // this.classNameToClass = new Map();
        this.bundleScriptRootPath = new Map();
    }

    public registerEnumMember(){

    }


    // public registerCommonUserWidgetClass(typeString: string) {
    //     let self = this
    //     return function <T extends CommonUserWidgetClass<ZCommonUserWidget>>(constructor: T) {
    //         console.log(typeString, constructor.name)
    //         self.typeToClassName.set(typeString, constructor.name)
    //         self.classNameToClass.set(constructor.name, constructor)
    //         return constructor;
    //     };
    // }
    // public getCommonUserWidgetClassByName(name: string): CommonUserWidgetClass<ZCommonUserWidget> {
    //     return this.classNameToClass.get(name)
    // }

    public registerBundleClassRootPath(bundelName: string, scriptRootPathPath: string): void {
        this.bundleScriptRootPath.set(bundelName, scriptRootPathPath)
    }

    public async loadClass(path) {
        path = '../G101/script/G101GameLayout'
        try {
            const tempMOde = await import(path);
            console.log(tempMOde)
        } catch (error) {
            console.error('Failed to import script:', error);
        }
    }

    public getClass(bundelName: string, scriptPath: string): void  {
        // G101GameLayout
        // let path = cc.path.join('../', bundelName, 'script', scriptPath)
        // let path = '../' + bundelName + '/script/' + scriptPath + '.ts'
        // import { G101GameLayout } from "../G101/script/G101GameLayout";
        // let rootPath = bundleScriptRootPath[bundelName]
        // console.log(path)
        // ../G101/script/G101GameLayout
        // import(path).then((tempModeule) => {
        //     console.log(tempModeule)
        // }).catch((error) => {
        //     console.error('Failed to load module:', error);
        // });
        // this.loadClass(path)
        const path = './Subsystem';
        import(path).then((module) => {
            // 从模块中解构出 ZSubsystem 类
            console.log(module)

        }).catch((error) => {
            console.error('模块加载出错:', error);
        });
    }
}