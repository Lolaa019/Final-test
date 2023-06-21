"use strict";

const { By } = require("selenium-webdriver");
const BasePage = require('./base.page');

module.exports = class OrderHistoryPage extends BasePage {

    goToOrderHistoryPage (){
        this.driver().get('http://test.qa.rs/history');
    };

    getOrderHistoryPageTitle (){
        return this.driver().findElement(By.tagName('h1')).getText();
    };

    getOrderRowInHistoryPage(orderID) {
        const xpathOrderRowInHistoryPage = `//td[contains(., "#${orderID}")]/parent::tr`;
        return this.driver().findElement(By.xpath(xpathOrderRowInHistoryPage));
    };

    getOrderStatus(orderRowInHistoryPage) {
        return orderRowInHistoryPage.findElement(By.xpath('td[5]'));
    }


}