import { Spawn } from './Spawn';
import { BossType } from './Types';
import { Wave } from './Wave';

const { ccclass, property } = cc._decorator;

// Wave 类定义


// 主组件类
@ccclass
export class WaveManager {
    // @property({ type: [NodePool], default: [] })
    // public foePools: NodePool[] = [];

    startWaveIdx: number = 0;
    waves: Wave[]
    // @property()
    // spawnMargin: number = 0;

    private _killedFoe: number = 0;
    get killedFoe() {
        return this._killedFoe;
    }
    set killedFoe(value: number) {
        this._killedFoe = value;
        // if (!this.currentWave || !this.waveTotalFoes) {
        //     return;
        // }
        // if (this.waveTotalFoes && this._killedFoe >= this.waveTotalFoes) {
        //     this.endWave();
        // }
        // if (this.waveProgress && this.waveTotalFoes) {
        //     let ratio = Math.min(this._killedFoe / this.waveTotalFoes, 1);
        //     this.waveProgress.updateProgress(ratio);
        // }
    }

    // @property({ type: Node })
    // waveProgress: cc.Node = null;
    // private _waveProgressComp: any;

    // @property({ type: Node })
    // bossProgress: cc.Node = null;
    // private _bossProgressComp: any;

    game: any;
    player: any;
    foeGroup: cc.Node = null;
    waveIdx: number = 0;
    spawnIdx: number = 0;
    currentWave: Wave = null;
    currentSpawn: Spawn = null;
    bossSpawn: Spawn | null = null;
    waveTotalFoes: number = 0;

    init(game: any) {
        this.game = game;
        this.player = game.player;
        this.foeGroup = game.foeGroup;
        this.waveIdx = this.startWaveIdx;
        this.spawnIdx = 0;
        this.currentWave = this.waves[this.waveIdx];

        // if (this.waveProgress) {
        //     this._waveProgressComp = this.waveProgress.getComponent('WaveProgress');
        //     this._waveProgressComp.init(this);
        // }
        // if (this.bossProgress) {
        //     this._bossProgressComp = this.bossProgress.getComponent('BossProgress');
        //     this._bossProgressComp.init(this);
        // }
    }

    startSpawn() {
        if (this.currentSpawn) {
            // this.schedule(this.spawnFoe, this.currentSpawn.spawnInterval);
        }
    }

    startBossSpawn(bossSpawn: Spawn) {
        this.bossSpawn = bossSpawn;
        this.waveTotalFoes = bossSpawn.total;
        this.killedFoe = 0;
        if (bossSpawn) {
            this.schedule(this.spawnBossFoe, bossSpawn.spawnInterval);
        }
    }

    endSpawn() {
        this.unschedule(this.spawnFoe);
        if (this.currentWave) {
            let nextSpawn = this.currentWave.getNextSpawn();
            if (nextSpawn) {
                this.currentSpawn = nextSpawn;
                this.startSpawn();
                if (nextSpawn.isCompany) {
                    this.startBoss();
                }
            }
        }
    }

    startWave() {
        this.unschedule(this.spawnFoe);
        if (this.currentWave) {
            this.currentWave.init();
            this.waveTotalFoes = this.currentWave.totalFoes;
            this.killedFoe = 0;
            this.currentSpawn = this.currentWave.spawns[this.currentWave.spawnIdx];
            this.startSpawn();
            if (this.game.inGameUI) {
                this.game.inGameUI.showWave(this.waveIdx + 1);
            }
        }
    }

    startBoss() {
        if (this._bossProgressComp) {
            this._bossProgressComp.show();
        }
        if (this.game.bossMng) {
            this.game.bossMng.startBoss();
        }
    }

    endWave() {
        if (this._bossProgressComp) {
            this._bossProgressComp.hide();
        }
        if (this.game.bossMng) {
            this.game.bossMng.endBoss();
        }
        if (this.waveIdx < this.waves.length - 1) {
            this.waveIdx++;
            this.currentWave = this.waves[this.waveIdx];
            this.startWave();
        } else {
            console.log('all waves spawned!');
        }
    }

    spawnFoe() {
        if (this.currentSpawn && this.currentSpawn.finished) {
            this.endSpawn();
            return;
        }
        if (this.currentSpawn && this.game.poolMng) {
            let newFoe = this.currentSpawn.spawn(this.game.poolMng);
            if (newFoe) {
                if (this.foeGroup) {
                    this.foeGroup.addChild(newFoe);
                    newFoe.setPosition(this.getNewFoePosition());
                    let foeComp = newFoe.getComponent('Foe');
                    if (foeComp) {
                        foeComp.init(this);
                    }
                }
            }
        }
    }

    spawnBossFoe() {
        if (this.bossSpawn && this.bossSpawn.finished) {
            this.unschedule(this.spawnBossFoe);
        }
        if (this.bossSpawn && this.game.poolMng) {
            let newFoe = this.bossSpawn.spawn(this.game.poolMng);
            if (newFoe) {
                if (this.foeGroup) {
                    this.foeGroup.addChild(newFoe);
                    newFoe.setPosition(this.getNewFoePosition());
                    let foeComp = newFoe.getComponent('Foe');
                    if (foeComp) {
                        foeComp.init(this);
                    }
                }
            }
        }
    }

    spawnProjectile(projectileType: any, pos: Vec2, dir: any, rot: any) {
        if (this.game.poolMng) {
            let newProjectile = this.game.poolMng.requestProjectile(projectileType);
            if (newProjectile) {
                if (this.foeGroup) {
                    this.foeGroup.addChild(newProjectile);
                    newProjectile.setPosition(pos);
                    let projectileComp = newProjectile.getComponent('Projectile');
                    if (projectileComp) {
                        projectileComp.init(this, dir);
                    }
                }
            } else {
                console.log('requesting too many projectiles! please increase size');
            }
        }
    }

    killFoe() {
        this.killedFoe++;
    }

    hitFoe() {
        if (this.game) {
            this.game.cameraShake();
        }
    }

    despawnFoe(foe: Foe) {
        let foeType = foe.foeType;
        if (this.game.poolMng) {
            this.game.poolMng.returnFoe(foeType, foe.node);
        }
    }

    despawnProjectile(projectile: any) {
        let type = projectile.projectileType;
        if (this.game.poolMng) {
            this.game.poolMng.returnProjectile(type, projectile.node);
        }
    }

    getNewFoePosition(): cc.Vec2 {
        if (this.foeGroup) {
            let randX = (Math.random() - 0.5) * 2 * (this.foeGroup.width - this.spawnMargin) / 2;
            let randY = (Math.random() - 0.5) * 2 * (this.foeGroup.height - this.spawnMargin) / 2;
            return new cc.Vec2(randX, randY);
        }
        return new cc.Vec2(0, 0);
    }
}