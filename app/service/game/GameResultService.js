import LocalStorageKeys from "../../util/LocalStorageKeys.js";

export default class GameResultService{

    saveToLocalStorage(gameResult){
        let results = JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
        if (results === null){
            results = [];
        }
        this.#addIfBetterThanOtherResults(results, gameResult);

        window.localStorage.setItem(LocalStorageKeys.RESULTS_KEY, JSON.stringify(results));
    }

    #addIfBetterThanOtherResults(results, gameResult){
        if (results.length < 10){
            results.push(gameResult);
        }

        else{
            results.sort((a, b) => {
                return b.time - a.time;
            })

            if (results[0] > gameResult) {
                results[0] = gameResult;
            }
        }
    }

    get results(){
        return JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
    }
}