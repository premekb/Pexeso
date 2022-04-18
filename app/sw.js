/**
 * I used cache-only strategy with slight changes from the cookbook shown in a lecture.
 *
 * https://serviceworke.rs/strategy-cache-only.html
 * https://github.com/mdn/serviceworker-cookbook/tree/master/strategy-cache-only
 *
 * If I were using NPM, then I would have opted for the sw-precache project (https://stackoverflow.com/questions/45222450/bulk-add-all-js-or-css-files-to-service-worker-cache-on-install)
 * Which would allow me to add all files in the project in a bulk, instead of having them listed out one by one
 * as I have it now.
 */

var CACHE = 'cache-only';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');

    // Ask the service worker to keep installing until the returning promise
    // resolves.
    evt.waitUntil(precache());
});

// On fetch, use cache only strategy.
self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(
            URLS_TO_CACHE
        );
    });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request, {cacheName:CACHE, ignoreVary:true, ignoreSearch:true}).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

const URLS_TO_CACHE = [
    "./util/ClickedCardsContainer.js",
    "./util/TimeConverter.js",
    "./util/CanvasHelper.js",
    "./util/LocalStorageKeys.js",
    "./config/Config.js",
    "./resources/img/no_wifi.svg",
    "./resources/img/cards/card_8.svg",
    "./resources/img/cards/card_9.svg",
    "./resources/img/cards/card_10.svg",
    "./resources/img/cards/card_7.svg",
    "./resources/img/cards/card_6.svg",
    "./resources/img/cards/card_4.svg",
    "./resources/img/cards/card_5.svg",
    "./resources/img/cards/card_1.svg",
    "./resources/img/cards/card_2.svg",
    "./resources/img/cards/card_3.svg",
    "./resources/img/wifi.svg",
    "./resources/readme.txt",
    "./resources/font/magic.ttf",
    "./resources/font/fantini.ttf",
    "./resources/sound/sound_icon.png",
    "./resources/sound/no_sound.png",
    "./resources/sound/card_flip.wav",
    "./resources/sound/ding.wav",
    "./styles/GamePage.css",
    "./styles/GameEndPage.css",
    "./styles/HighScorePage.css",
    "./styles/General.css",
    "./styles/MainMenuPage.css",
    "./model/Game.js",
    "./model/GameResult.js",
    "./model/Board.js",
    "./model/Card.js",
    "./app.html",
    "./service/other/FileHandler.js",
    "./service/other/HistoryHandler.js",
    "./service/game/GameResultService.js",
    "./service/game/GameService.js",
    "./service/game/CardService.js",
    "./service/game/BoardService.js",
    "./pages/GameEndPage.js",
    "./pages/HighScorePage.js",
    "./pages/AbstractPage.js",
    "./pages/MainMenuPage.js",
    "./pages/GamePage.js",
    "./factory/GameFactory.js",
    "./app.js",
    "./sw.js"
]