/**
 * Heavily inspired by https://ondras.github.io/rri/sw.js
 */

 const CACHE_NAME = "offline";
 const urlsToCache = [
     "app.js",
     "General.css",
     "app.html",
     "util/HistoryHandler.js",
     "util/LocalStorageKeys.js",
     "service/BoardService.js",
     "service/CardService.js",
     "service/GameResultService.js",
     "service/GameService.js",
     "resources/card_flip.wav",
     "resources/ding.wav",
     "pages/AbstractPage.js",
     "pages/GameEndPage.js",
     "pages/GamePage.js",
     "pages/HighScorePage.js",
     "pages/MainMenuPage.js",
     "model/Board.js",
     "model/Card.js",
     "model/Game.js",
     "model/GameResult.js",
     "factory/GameFactory.js"
 ];
 
 async function precache() {
	const cache = await caches.open(CACHE_NAME);
	return cache.addAll(urlsToCache);
};

async function respondTo(request) {
    const cached = await caches.match(request);
    let f = fetch(request);

	if (cached) { // try updating the cache first
		try {
			let response = await f;
			let cache = await caches.open(CACHE_NAME);
			cache.put(request, response.clone());
			return response;
		} catch (e) { // offline
			return cached;
		}
	} else { // not cached, forward to network
		return f;
	}
};

async function onInstall(e) {
	self.skipWaiting();
	e.waitUntil(precache());
}

async function onFetch(e) {
	e.respondWith(respondTo(e.request));
}

self.addEventListener("install", onInstall);
self.addEventListener("fetch", onFetch);