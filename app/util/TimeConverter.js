export default class TimeConverter{
    static secondsToMinutesAndSecondsString(inputSeconds){
        const minutes = Math.floor(inputSeconds / 60);
        const seconds = inputSeconds - minutes * 60;

        return `${minutes} : ${seconds}`;
    }
}