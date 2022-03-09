export default class GameResult{
    #time;
    #playerName;
    #message;
    #timeSaved;

    /**
     *
     * @param time
     * @param playerName
     * @param message
     * @param timeSaved expected to be Date object
     */
    constructor(time, playerName, message, timeSaved) {
        this.#time = time;
        this.#playerName = playerName;
        this.#message = message;
        this.#timeSaved = this.#parseTimeSaved(timeSaved);
    }

    #parseTimeSaved(timeSaved){
        const day = timeSaved.getDay().toString().length === 2 ? timeSaved.getDay() : "0" + timeSaved.getDay().toString();
        const month = timeSaved.getMonth().toString().length === 2 ? timeSaved.getMonth() : "0" + timeSaved.getMonth().toString();;
        const year = timeSaved.getFullYear();
        const hours = timeSaved.getHours().toString().length === 2 ? timeSaved.getHours() : "0" + timeSaved.getHours().toString();
        const minutes = timeSaved.getMinutes().toString().length === 2 ? timeSaved.getMinutes() : "0" + timeSaved.getMinutes().toString();

        return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    }

    get time() {
        return this.#time;
    }

    set time(value) {
        this.#time = value;
    }

    get playerName() {
        return this.#playerName;
    }

    set playerName(value) {
        this.#playerName = value;
    }

    get message() {
        return this.#message;
    }

    set message(value) {
        this.#message = value;
    }

    get timeSaved() {
        return this.#timeSaved;
    }

    set timeSaved(value) {
        this.#timeSaved = value;
    }

    toJSON(){
        return {
            time: this.#time,
            playerName: this.#playerName,
            message : this.#message,
            timeSaved: this.#timeSaved
        };
    }
}