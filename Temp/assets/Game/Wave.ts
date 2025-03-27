import { Spawn } from "./Spawn";

export class Wave {
    spawns: Spawn[] = [];
    bossType: string = ''

    totalFoes: number = 0;
    spawnIdx: number = 0;
    init() {
        this.totalFoes = 0;
        this.spawnIdx = 0;
        for (let i = 0; i < this.spawns.length; ++i) {
            if (!this.spawns[i].isCompany) {
                this.totalFoes += this.spawns[i].getTotal();
            }
        }
    }

    getNextSpawn(): Spawn {
        this.spawnIdx++;
        if (this.spawnIdx < this.spawns.length) {
            return this.spawns[this.spawnIdx];
        } else {
            return null;
        }
    }
}



export const data =
{
    "1": {
        "round_id": 1,
        "tile_1": 11,
        "tile_2": 23,
        "tile_3": 1,
        "tile_4": 3,
        "tile_5": 55,
        "tile_6": 11,
        "tile_7": 66
    },
    "2": {
        "round_id": 2,
        "tile_1": 1,
        "tile_2": 4,
        "tile_3": 22,
        "tile_4": 3,
        "tile_5": 5,
        "tile_6": 1,
        "tile_7": 3
    },
    "3": {
        "round_id": 3,
        "tile_1": 0,
        "tile_2": 0,
        "tile_3": 1,
        "tile_4": 1,
        "tile_5": 2,
        "tile_6": 3,
        "tile_7": 5
    }
}