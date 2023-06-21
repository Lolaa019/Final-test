"use strict"
module.exports = class BasePage {
    #driver;
    constructor (webdriver) {
        this.#driver = webdriver;
    };
    driver(){
        return this.#driver;
    };

    getCurrentUrl(){
        return this.driver().getCurrentUrl();
    }
}