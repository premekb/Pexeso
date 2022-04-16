import LocalStorageKeys from "../../util/LocalStorageKeys.js";

export default class FileHandler{
    static isImageSaved(){
        return window.localStorage.getItem(LocalStorageKeys.CUSTOM_IMAGE_KEY) !== null;
    }

    static getImage(){
        let base64url = window.localStorage.getItem(LocalStorageKeys.CUSTOM_IMAGE_KEY);
        return base64url.substring(1, base64url.length - 1);
    }

    async handleEvent(e){
        const file = e.target.files[0];

        if (!this.validateFile(file)) return;

        const url = URL.createObjectURL(file);
        const serialized = await this.serializeImage(file);
        window.localStorage.setItem(LocalStorageKeys.CUSTOM_IMAGE_KEY, JSON.stringify(serialized));
        const event = new Event("addimage");
        document.dispatchEvent(event);
    }

    validateFile(file){
        if (!file.type.includes("image")){
            alert("Unable to load file. It is not an image.");
            return false;
        }

        if (file.size > 1_000_000){
            alert("Unable to load file. It is too big. Maximum size is 1 mb.");
            return false;
        }

        if (!file.type.includes("svg")){
            alert("Image might not display properly. SVG image format is recommended.");
        }

        return true;
    }

    /**
     * Base64 encoding copied from: https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
     */
    async serializeImage(f){
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        return await toBase64(f);
    }
}