import { ZCommonMessagingSubsystem } from "../../ZFrameWork/CommonMessagingSubsystem";
import { GameInstance } from "../../ZFrameWork/GameInstance";
import { Delegate } from "../../ZFrameWork/GameManager/Delegate";
import { CommonGameDialogDescriptor } from "../../ZFrameWork/Widget/CommonGameDialogLayer";
import { GameContext, IActionHandler, ZActionHandlerSubsystem } from "../ActionHandlerSubsystem";

export class CoinItemAction implements IActionHandler<{ coin: number }> {
    parseConfig(rawItem: any) {
        return {
            coin: rawItem.value_1
        }; // 从原始数据提取所需参数
    }

    execute(context: GameContext, config: { coin: number }, delegate: Delegate<() => void>) {
        context.world.gameMode.playerState.addCoin(config.coin)
        let tempString = "获得金币" + config.coin
        GameInstance.getInstance().getSubsystem(ZCommonMessagingSubsystem).showConfirmation(CommonGameDialogDescriptor.createConfirmationYesNo('', tempString), delegate)
        console.log("CoinItemAction")
    }
}
GameInstance.getInstance().getSubsystem(ZActionHandlerSubsystem).register(1, CoinItemAction)

