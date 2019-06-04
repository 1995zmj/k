export class TimeManager
{
    private static instance: TimeManager = null;
    public static getInstance(): TimeManager
    {
        if(this.instance == null)
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
}