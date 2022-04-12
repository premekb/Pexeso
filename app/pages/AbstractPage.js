import MainMenuPage from "./MainMenuPage.js";

export default class AbstractPage{
    main = document.querySelector("#main");

    #GENERAL_STYLESHEET = "General.css";

    render(){
        this.#resetMain();
        this.#replaceStyleSheet()
    }

    createDivWrapper(){
        const divWrapper = document.createElement("div");
        divWrapper.id = "outline-wrapper";
        return divWrapper;
    }

    createMainMenuButton(){
        const mainMenuButton = document.createElement("button");
        mainMenuButton.innerText = "Back to menu";
        mainMenuButton.addEventListener("click", (e) => {
            const mainMenuPage = new MainMenuPage();
            mainMenuPage.render();
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

    #resetMain(){
        this.main.innerHTML = "";
        this.main.classList.add(this.constructor.name);
    }
}