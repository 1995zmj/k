export class ConstValue {
    /*------ 动态加载目录 ------*/
    public static readonly AUDIO_DIR = "audio/";
    public static readonly CONFIG_FILE_DIR = "config/";
    public static readonly PREFAB_UI_DIR = "prefab/ui/";
    public static readonly PREFAB_POOL_DIR = "prefab/pool/";
    public static readonly PREFAB_FISH_DIR = "prefab/fishs/";

    public static readonly SCREEN_HEIGHT = 1920;
    public static readonly SCREEN_WIDTH = 1080;
    public static readonly FLYING_DRAGON_INTERVAL = 30;
    public static readonly EVENT_TIME_CD = 30;



    /*------ 层级 ------*/
    public static readonly UNIT = 1;

    public static readonly MAIN_UI_ZINDEX = 0 * ConstValue.UNIT;

    public static readonly DEFAULT_UI_ZINDEX = 10 * ConstValue.UNIT;

    public static readonly SHOP_UI_ZINDEX = 20 * ConstValue.UNIT;

    public static readonly LAYER_UI_ZINDEX = 50 * ConstValue.UNIT;

    public static readonly LOADING_UI_ZINDEX = 100 * ConstValue.UNIT;



    
}