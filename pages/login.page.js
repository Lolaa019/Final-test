"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class LoginPage extends BasePage{

    getInputUsername (){
        return this.driver().findElement(By.name('username'));
    };

    fillInputUsername (username) {
        this.getInputUsername().sendKeys(username);
    };

    getInputPassword (){
        return this.driver().findElement(By.name('password'));
    };

    fillInputPassword (password) {
        this.getInputPassword().sendKeys(password);
    };

    getButtonLogin (){
        return this.driver().findElement(By.name('login'));
    };

    isButtonLoginDisplayed (){
        return this.getButtonLogin().isDisplayed();
    }





}
