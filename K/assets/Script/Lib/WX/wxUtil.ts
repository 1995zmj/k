export class WXUtil {
    private static instance: WXUtil = null;
    public static getInstance(): WXUtil {
        if (this.instance == null) {
            this.instance = new WXUtil();
        }
        return this.instance;
    }


    share(title:string, imageUrl:string, callback:Function) {
        // wx.shareAppMessage({
        //     title: title,
        //     // imageUrl: imageUrl,
        // });
    }


}
