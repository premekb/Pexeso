import LocalStorageKeys from "../util/LocalStorageKeys.js";

export default class GameResultService{
    saveToLocalStorage(gameResult){
        let results = JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
        if (results === null){
            results = [];
        }
        results.push(gameResult);
        window.localStorage.setItem(LocalStorageKeys.RESULTS_KEY, JSON.stringify(results));
        console.log("Game result saved to local storage.");
    }

    get results(){
        return JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
    }
}