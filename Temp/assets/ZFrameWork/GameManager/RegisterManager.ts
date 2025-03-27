import { ZActor, ZActorClass } from "../Actor";
import { ZCommonUserWidget, ZCommonUserWidgetClass } from "../CommonUserWidget";
import { ZClass, ZObject } from "../Object";


export class RegisterManager {
    private static instance: RegisterManager;

    public static getInstance(): RegisterManager {
        if (this.instance == null) {
            this.instance = new RegisterManager();
        }
        return this.instance;
    }

    private classNameToClass: Map<string, ZClass<ZObject>> = new Map()
    private actorClassNameToClass: Map<string, ZActorClass<ZActor>> = new Map()
    private widgetClassNameToClass: Map<string, ZCommonUserWidgetClass<ZCommonUserWidget>> = new Map()

    // zobject
    public registertClass<T extends ZObject>(objectClass: ZClass<T>) {
        this.classNameToClass.set(objectClass.name, objectClass)
    }
    public getClassByName<T extends ZObject>(name: string): ZClass<T> {
        return this.classNameToClass.get(name) as ZClass<T>
    }

    // zactor
    public registertActorClass<T extends ZActor>(actorClass: ZActorClass<T>) {
        this.actorClassNameToClass.set(actorClass.name, actorClass)
    }

    public getActorClassByName<T extends ZActor>(name: string): ZActorClass<T> {
        return this.actorClassNameToClass.get(name) as ZActorClass<T>
    }

    // zwidget
    public registertWidgetClass<T extends ZCommonUserWidget>(widgetClass: ZCommonUserWidgetClass<T>) {
        this.widgetClassNameToClass.set(widgetClass.name, widgetClass)
    }
    public getWidgetClassByName<T extends ZCommonUserWidget>(name: string): ZCommonUserWidgetClass<T> {
        return this.widgetClassNameToClass.get(name) as ZCommonUserWidgetClass<T>
    }

    // public registerBundleClassRootPath(bundelName: string, scriptRootPathPath: string): void {
    //     this.bundleScriptRootPath.set(bundelName, scriptRootPathPath)
    // }

    // public async loadClass(path) {
    //     path = '../G101/script/G101GameLayout'
    //     try {
    //         const tempMOde = await import(path);
    //         console.log(tempMOde)
    //     } catch (error) {
    //         console.error('Failed to import script:', error);
    //     }
    // }

    // public getClass(bundelName: string, scriptPath: string): void  {
    //     // G101GameLayout
    //     // let path = cc.path.join('../', bundelName, 'script', scriptPath)
    //     // let path = '../' + bundelName + '/script/' + scriptPath + '.ts'
    //     // import { G101GameLayout } from "../G101/script/G101GameLayout";
    //     // let rootPath = bundleScriptRootPath[bundelName]
    //     // console.log(path)
    //     // ../G101/script/G101GameLayout
    //     // import(path).then((tempModeule) => {
    //     //     console.log(tempModeule)
    //     // }).catch((error) => {
    //     //     console.error('Failed to load module:', error);
    //     // });
    //     // this.loadClass(path)
    //     const path = './Subsystem';
    //     import(path).then((module) => {
    //         // 从模块中解构出 ZSubsystem 类
    //         console.log(module)

    //     }).catch((error) => {
    //         console.error('模块加载出错:', error);
    //     });
    // }
}