export default class AbstractPage{
    main = document.querySelector("#main");

    render(){
        this.#resetMain();
    }

    #resetMain(){
        document.querySelector("#main").innerHTML = "";
    }
}