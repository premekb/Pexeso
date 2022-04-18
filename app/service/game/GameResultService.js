import LocalStorageKeys from "../../util/LocalStorageKeys.js";

export default class GameResultService{

    /**
     * Saves the result into local storage, if the result is TOP 10 in the out of the already saved.
     * @param gameResult
     */
    saveToLocalStorage(gameResult){
        let results = JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
        if (results === null){
            results = [];
        }
        this.#addIfBetterThanOtherResults(results, gameResult);

        window.localStorage.setItem(LocalStorageKeys.RESULTS_KEY, JSON.stringify(results));
    }

    /**
     * Decides, whether to add the result or not into the array, that will be saved into
     * the local storage.
     *
     * @param results
     * @param gameResult
     */
    #addIfBetterThanOtherResults(results, gameResult){
        if (results.length < 10){
            results.push(gameResult);
        }

        else{
            results.sort((a, b) => {
                return b.time - a.time;
            })

            if (results[0].time > gameResult.time) {
                results[0] = gameResult;
            }
        }
    }

    get results(){
        return JSON.parse(window.localStorage.getItem(LocalStorageKeys.RESULTS_KEY));
    }
}