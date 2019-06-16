

export class UIHelp
{
    // public static showTip(message: string)
    // {
    //     let tipUI = UIManager.getInstance().getUI(TipUI) as TipUI;
    //     if(!tipUI)
    //     {
    //         UIManager.getInstance().openUI(TipUI, 200, ()=>{
    //             UIHelp.showTip(message);
    //         });
    //     }
    //     else
    //     {
    //         tipUI.showTip(message);
    //     }
    // }

    // public static canShare(type: string): boolean
    // {
    //     let share = false;
    //     let lengthId = GameDataManager.getInstance().getGameData().playerInfo.maxCurDragonId;
    //     if(GameDataManager.getInstance().getGameData().inBlackList)
    //     {
    //         share = false;
    //     }
    //     else
    //     {
    //         share = globalManager.canShare(type, {"level": lengthId});
    //     }
    //     return share;
    // }

    // public static onAdsOrShare(callback: Function, type: string)
    // {
    //     let share = UIHelp.canShare(type);

    //     if(share)
    //     {
    //         this.onBtnShare(callback, type);
    //     }
    //     else
    //     {
    //         this.onBtnAds(callback, type);
    //     }
    // }

    // static onBtnAds(callback: Function, type: string)
    // {
    //     switch (PlatformManager.getInstance().platform) {
    //         case EPlatform.android:
    //             //ymn
    //             cc.log("Ymn")
    //             let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
    //             server_util_android.logEvent("2001003", type, playerInfo.level, playerInfo.gold, playerInfo.gem, playerInfo.maxTurn);
                
    //             analytics.watch_video_event(type);

    //             Ymn.getInstance().showReward (function () {
    //                 analytics.watch_video_success_event(type);
    //                 server_util_android.logEvent("2001004", type, playerInfo.level, playerInfo.gold, playerInfo.gem, playerInfo.maxTurn);
    //                 server_util_android.watchAdForServer();
    //                 GameDataManager.getInstance().getGameData().addTaskProgress(ETaskType.watchVideo);
    //                 if(callback)
    //                 {
    //                     callback();
    //                 }
    //             }.bind(this),
    //             function () {
    //                 UIHelp.showTip("No available Ad right now, try again later.");
    //             }.bind(this));

    //             break;
    //         case EPlatform.h5:
    //             //fbinstant
    //             UIManager.getInstance().openUI(DialogueBoxUI, 200, ()=>{
    //                 let ui = UIManager.getInstance().getUI(DialogueBoxUI) as DialogueBoxUI;
    //                 ui.initUI(()=>{
    //                     analytics.watch_video_event(type);
    //                     fbinstant.showRewardAd(function () {
    //                         analytics.watch_video_success_event(type);
    //                         if(callback)
    //                         {
    //                             callback();
    //                         }
    //                     }.bind(this),
    //                     function (msg) {
    //                         fbinstant.requestRewardAd();
    //                         cc.log("msg = " + msg);
    //                         UIHelp.showTip("No available Ad right now, try again later.");
    //                     }.bind(this));
        
    //                 });
    //             });
                
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // public static onBtnGem(callback: Function, cost: number, type: string)
    // {
    //     let playerInfo = GameDataManager.getInstance().getGameData().playerInfo;
    //     analytics.log_event_type("diamond_purchase_click", type);
    //     if(numberUtil.cmpBigInt(playerInfo.gem, cost) >= 0)
    //     {
    //         playerInfo.gem = numberUtil.galaxySub(playerInfo.gem, cost);
    //         analytics.log_event_type("diamond_purchase_click_success", type);
    //         callback&& callback();
    //     }
    //     else
    //     {
    //         UIHelp.showTip("Not enough diamonds");
    //         let ui = UIManager.getInstance().getUI(GemStoreUI) as GemStoreUI;
    //         if(!ui || ui.node.active == false)
    //             UIManager.getInstance().showUI(GemStoreUI, (ui: GemStoreUI)=>{
    //                 ui.scrollToBottom();
    //             });
    //     }
    // }

    // public static showInterstitial(type: string){
    //     let ymn = Ymn.getInstance();
    //     ymn.showInterstitial(function(){
    //         //埋点
    //         cc.log("ymn__埋点");
    //         analytics.interstitial_event(type);
    //     })
    //     cc.log("播放插页");
    // }

    // public static showBanner(){
    //     //等等待功能开发
    // }

    // static onBtnShare(callback: Function, type: string)
    // {
    //     let config = globalManager.getShareConfig(type);

    //     fbinstant.chooseContext(()=>{
    //         cc.log('chooseContext success');
    //         fbinstant.updateContext(()=>{
    //             cc.log('updateContext success');
    //             if(callback)
    //             {
    //                 callback();
    //             }
    //             analytics.log_event("share_success_type");
    //         }, (code, msg)=>{
    //             cc.log('updateContext fail:'+ code + "msg = " + msg);
    //             UIHelp.showTip(msg);
    //         }, {type:type}, config.img, config.text);
    //     }, (code, msg)=>{
    //         cc.log('chooseContext fail:'+ code + "msg = " + msg);
    //     });
    //     analytics.share_type_event(type);
    // }
}

