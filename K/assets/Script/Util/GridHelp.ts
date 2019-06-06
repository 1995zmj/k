import { GridConfigContainer } from "../Config/GridConfigContainer";
import { ConfigManager } from "../Manager/ConfigManager";

export class GridHelp
{
    static getGridPosition(id: number): cc.Vec2
    {
        let Container = ConfigManager.getInstance().getConfig(GridConfigContainer) as GridConfigContainer;

        return Container.getPosition(id).add(cc.v2(0,25));
    }
}