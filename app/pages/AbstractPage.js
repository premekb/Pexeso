export default class AbstractPage{
    main = document.querySelector("#main");

    #GENERAL_STYLESHEET = "General.css";

    render(){
        this.#resetMain();
        this.#replaceStyleSheet()
    }

    #replaceStyleSheet(){
        let stylesheets = document.querySelectorAll("link[rel=stylesheet]");
        for (let stylesheet of stylesheets){
            const hrefSplit = stylesheet.href.split("/");
            console.log(hrefSplit[hrefSplit.length - 1]);
            if (hrefSplit[hrefSplit.length - 1] !== this.#GENERAL_STYLESHEET){
                console.log(stylesheet.href);
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