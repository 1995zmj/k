export class TimeManager
{
    private static instance: TimeManager = null;
    public static getInstance(): TimeManager
    {
        if (this.instance == null)
        {
            this.instance = new TimeManager();
        }
        return this.instance;
    }


    constructor()
    {
        //this.timeDate = new Date();
    }

    /** Gets the time value in milliseconds. **/
    getCurrentTime(): number
    {
        let timeDate = new Date();
        return timeDate.getTime();
    }

    /***
     * 倒计时
     */
    countTime(second: number, callback: Function): number
    {
        callback(second);
        let id = setInterval(() =>
        {
            second--;
            if (second >= 0)
            {
                callback(second);
            }
            else
            {
                cc.log('stop Interval=' + id)
                clearInterval(id);
            }
        }, 1000);
        return id;
    }

    clearInterval(id: number)
    {
        cc.log('clearInterval=' + id)
        clearInterval(id);
    }

}