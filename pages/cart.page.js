"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class CartPage extends BasePage{

    actionEmptyCart (){

        this.driver().get('http://test.qa.rs/cart/clear');
    };

    goToShoppingCartPage (){
        return this.driver().get('http://test.qa.rs/cart');
    };

    getOrderRow (chooseBurgerUpperCase){
        const xpathRow = `(//td[contains(., "${chooseBurgerUpperCase}")])/parent::tr`
        return this.driver().findElement(By.xpath(xpathRow));

    };

    getOrderQuantity (orderRow){
        return orderRow.findElement(By.xpath('td[2]'));
    };

    getPricePerItem (orderRow){
        return orderRow.findElement(By.xpath('td[3]'));

    };

    getTotalItemPrice (orderRow){
        return orderRow.findElement(By.xpath('td[4]'));
    };

    getCartTotal (){
        const xpathTotalRow = '//td[contains(., "Total:")]';
        return this.driver().findElement(By.xpath(xpathTotalRow));


    };
    getCheckoutButton (){
        return this.driver().findElement(By.name("checkout"));

    }










}
