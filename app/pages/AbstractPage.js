import MainMenuPage from "./MainMenuPage.js";

export default class AbstractPage{
    main = document.querySelector("#main");

    #GENERAL_STYLESHEET = "General.css";

    render(){
        this.#resetBody();
        this.#replaceStyleSheet()
        this.#handleConnectionIcon()
    }

    #handleConnectionIcon(){
        this.#renderConnectionIcon();
        window.addEventListener("online", this.#renderConnectionIcon.bind(this));
        window.addEventListener("offline", this.#renderConnectionIcon.bind(this));
    }

    #renderConnectionIcon(){
        const connectionIcon = document.querySelector("#connection-icon");
        if (connectionIcon === null){
            this.main.append(this.#createConnectionIcon());
        }

        else{
            connectionIcon.replaceWith(this.#createConnectionIcon());
        }
    }

    #createConnectionIcon(){
        let connectionImg = document.createElement("img");
        connectionImg.src = navigator.onLine ? "resources/img/wifi.svg" : "resources/img/no_wifi.svg";
        connectionImg.id = "connection-icon";
        connectionImg.alt = navigator.onLine ? "Icon showing, that you are connected to the internet." : "Icon showing, that you are not connected to the internet."
        return connectionImg;
    }

    createDivWrapper(){
        const divWrapper = document.createElement("div");
        divWrapper.id = "outline-wrapper";
        return divWrapper;
    }

    createMainMenuButton(){
        const mainMenuButton = document.createElement("button");
        mainMenuButton.innerText = "Back to menu";
        mainMenuButton.id = "main-menu-button";
        mainMenuButton.addEventListener("click", (e) => {
            const mainMenuPage = new MainMenuPage();
            this.main.classList.add("main-disappearance");
            setTimeout(() => {mainMenuPage.render();}, 1000);
        })
        return mainMenuButton;
    }

    /**
     * Creates a link on the page based on its name.
     * E.g. for class GamePage.js is created link to styles/GamePage.css
     */
    #replaceStyleSheet(){
        let stylesheets = document.querySelectorAll("link[rel=stylesheet]");
        for (let stylesheet of stylesheets){
            const hrefSplit = stylesheet.href.split("/");
            if (hrefSplit[hrefSplit.length - 1] !== this.#GENERAL_STYLESHEET){
                stylesheet.remove();
            }
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "styles/" + this.constructor.name + ".css";
        document.querySelector("head").append(link);
    }

    /**
     * Removes everything inside of the body tag.
     */
    #resetBody(){
        document.querySelector("body").innerHTML = "";
        this.main = document.createElement("main");
        document.querySelector("body").append(this.main);
        this.main.classList.add(this.constructor.name);
    }
}