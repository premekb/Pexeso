import MainMenuPage from "./MainMenuPage.js";

export default class AbstractPage{
    main = document.querySelector("#main");

    #GENERAL_STYLESHEET = "General.css";

    render(){
        this.#resetBody();
        this.#replaceStyleSheet()
       // TODO this.#renderConnectionIcon();
    }

    #renderConnectionIcon(){
        if (navigator.onLine !== undefined){
            this.main.append(this.#createConnectionIcon());
        }

        window.addEventListener("online", this.#renderConnectionIcon.bind(this));
        window.addEventListener("offline", this.#renderConnectionIcon.bind(this));
    }

    #createConnectionIcon(){
        let connectionImg = document.createElement("img");
        connectionImg.src = navigator.online ? "resources/img/wifi.svg" : "resources/img/no_wifi.svg";
        connectionImg.id = "connection-icon";
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

    #resetBody(){
        document.querySelector("body").innerHTML = "";
        this.main = document.createElement("main");
        document.querySelector("body").append(this.main);
        this.main.classList.add(this.constructor.name);
    }
}