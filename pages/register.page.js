"use strict";
const {By} = require("selenium-webdriver");
const BasePage = require ('./base.page');

module.exports = class RegisterPage extends BasePage {

    getRegisterButton () {
        return this.driver().findElement(By.name('register'));
    };

    getRegisterButtonValue (){
        return this.getRegisterButton().getAttribute('value'); //vraca vrednost atributa u zagradi
    };

    getCurrentUrl (){
        return this.driver().getCurrentUrl();
    };

    getInputFirstName (){
        return this.driver().findElement(By.name('firstname'));
    };
    fillInputFirstName (firstname) {
        this.getInputFirstName().sendKeys(firstname);
    }

    getInputLastName (){
        return this.driver().findElement(By.name('lastname'));
    };
    fillInputLastName (lastname) {
        this.getInputLastName().sendKeys(lastname);
    }

    getInputEmail (){
        return this.driver().findElement(By.name('email'));

    };
    fillInputEmail (email) {
        this.getInputEmail().sendKeys(email);
    }

    getInputUsername (){
        return this.driver().findElement(By.name('username'));
    };
    fillInputUsername (username) {
        this.getInputUsername().sendKeys(username);
    }

    getInputPassword (){
        return this.driver().findElement(By.name('password'));
    };

    fillInputPassword (password) {
        this.getInputPassword().sendKeys(password);
    }

    getInputConfirmPassword (){
        return this.driver().findElement(By.name('passwordAgain'));
    };
    fillInputPasswordConfirm (passwordAgain) {
        this.getInputConfirmPassword().sendKeys(passwordAgain);
    }

    random (min, max){
        return Math.floor(Math.random() * (max - min)) + min;

    }

}