"use strict";

const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');
module.exports = class HomePage extends BasePage {

    goToHomePage() {
        this.driver().get('http://test.qa.rs/')
    };

    getPageHeaderTitle () {
        return this.driver().findElement(By.tagName('h1')).getText();
    };

    isOrderNowDisplayed () {
        return this.driver().findElement(By.xpath('//div[@class="row" and contains (., "ORDER NOW")]')).isDisplayed();
    };

    async clickOnRegisterLink () {
        const registerLink = this.driver().findElement(By.linkText('Register'));
        await registerLink.click();

    };
    getSuccessAlertText (){
        return this.driver().findElement(By.className('alert alert-success')).getText()
    };

    goToLoginPage(){
        this.driver().get('http://test.qa.rs/login');
    };

    getWelcomeBackTitle (){
        return this.driver().findElement(By.tagName('h2')).getText();
    };

    getLinkLogout (){
        return this.driver().findElement(By.partialLinkText('Logout'));
    };

    isLoginLinkDisplayed (){
        return this.driver().findElement(By.linkText('Login')).isDisplayed();
    };

    getPackageDiv (chooseBurger){
        const xpathPackageDiv = `((//h3[contains(., "${chooseBurger}")])/ancestor::div[contains (@class, "panel")])[1]`;
        return this.driver().findElement(By.xpath(xpathPackageDiv));
    };

    getQuantityInput (selectedBurgerDiv){
        return selectedBurgerDiv.findElement(By.name('quantity'));


    };

    getSideDishDropdown (selectedBurgerDiv){
        return selectedBurgerDiv.findElement(By.name('side'));



    };

    getSideDishOptions (sideDishDropdownElement) {
        return sideDishDropdownElement.findElements(By.tagName('option'));



    };

    getOrderButton (selectedBurgerDiv){
        return selectedBurgerDiv.findElement(By.className('btn btn-success'));
    };

    getCutleryCheckbox (selectedBurgerDiv){
        return selectedBurgerDiv.findElement(By.name('cutlery'));

    }









}