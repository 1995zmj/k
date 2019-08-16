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

    getTimeByHMS(second:number): string 
    {
        var hour = parseInt((second / 3600).toString());
        var minit = parseInt(((second - hour * 3600) / 60).toString());
        var second = second - hour * 3600 - minit * 60;
        let time = (hour < 10 ? ('0' + hour) : hour) + ':' + (minit < 10 ? ('0' + minit) : minit) + ':' + (second < 10 ? ('0' + second) : second);
        return time
    }


}