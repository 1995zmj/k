import { CommonUIExtensions } from "../../ZFrameWork/CommonUIExtensions";
import { GameInstance } from "../../ZFrameWork/GameInstance";
import { Delegate } from "../../ZFrameWork/GameManager/Delegate";
import { GameContext, IActionHandler, ZActionHandlerSubsystem } from "../ActionHandlerSubsystem";
import { ZMainBattleLayer } from "../Widget/MainBattleLayer";

export class MonsterItemAction implements IActionHandler<{ itemId: number; hp: number; atk: number }> {

    parseConfig(rawItem: any) {
        return {
            itemId: rawItem.item_id,
            hp: rawItem.value_1,
            atk: rawItem.value_2
        };
    }

    async execute(context: GameContext, config: { itemId: number; hp: number; atk: number }, delegate: Delegate<() => void>) {
        console.log("打一个怪物")
        
        let playerHp = context.world.gameMode.playerState.hp
        let playerAtk = context.world.gameMode.playerState.atk
        let monsterHp = config.hp
        let monsterAtk = config.atk
        let count =  Math.ceil(monsterHp / playerAtk);
        context.world.gameMode.playerState.damage(count * monsterAtk)
        CommonUIExtensions.pushContentToLayer('UI.Layer.GameMenu', ZMainBattleLayer, (widget) => {
            (widget as ZMainBattleLayer).setBattle(
                {
                    'name': "my",
                    'hp': playerHp,
                    'atk': playerAtk,
                },
                {
                    'name': config.itemId.toString(),
                    'hp': monsterHp,
                    'atk': monsterAtk,
                },
                delegate
            )
        })
        console.log("MonsterItemAction")
    }
}

GameInstance.getInstance().getSubsystem(ZActionHandlerSubsystem).register(2, MonsterItemAction)
