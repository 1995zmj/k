import { BaseConfigContainer } from "../GameManager/ConfigManager";

export interface DefaultPawnData {
    pawnClass: string;
    abilitySets: string;
    tagRelationshipMapping: string;
    inputConfig: string;
    defaultCameraMode: string;
}

export interface ActionData {
    actionClassName: string;
    data: Array<Array<string>>
}

export interface ExperienceData {
    gameFeaturesToEnable: Array<string>;
    defaultPawnData: DefaultPawnData;
    actions: Array<ActionData>;
    actionSets: Array<string>;
}

export interface GameModeData {
    gameModeClassString: string;
    gameStateClassString: string;
    experienceConfig: ExperienceData
}

export class GameModetConfigContainer extends BaseConfigContainer {
    public getData(): GameModeData{
        return this._data as GameModeData
    }
}
