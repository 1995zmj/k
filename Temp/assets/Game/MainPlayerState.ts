import { Delegate } from "../ZFrameWork/GameManager/Delegate";
import { RegisterManager } from "../ZFrameWork/GameManager/RegisterManager";
import { ZPlayerState } from "../ZFrameWork/PlayerState";
export class ZMainPlayerState extends ZPlayerState {
    private _hp: number
    private _atk: number
    private _coin: number

    public onAttributeChange: Delegate<(attributeKey: string)=>void> = null

    public get hp() : number {
        return this._hp
    }
    public get atk() : number {
        return this._atk
    }
    public get coin() : number {
        return this._coin
    }
    
    public init(): void {
        super.init()
        this._hp = 100
        this._atk = 3
        this._coin = 10
        this.onAttributeChange = Delegate.create<(attributeKey: string)=>void>()
    }

    public addCoin(coin)
    {
        this._coin += coin
        this.onAttributeChange.broadcast('coin')
    }

    public damage(atk)
    {
        this._hp = Math.max(0, this._hp - atk)
        this.onAttributeChange.broadcast('hp')
    }
}
RegisterManager.getInstance().registertActorClass(ZMainPlayerState)