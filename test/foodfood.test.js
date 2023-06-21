"use strict";
require ("chromedriver");
const webdriver = require ('selenium-webdriver');
const {By, Key, until} = require ('selenium-webdriver');
const chai = require ('chai');
const chaiAsPromised = require ('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
const {assert, expect} = require ('chai');
const {elementLocated} = require("selenium-webdriver/lib/until");
require('dotenv').config();



const HomePage = require ('../pages/home.page');
const RegisterPage = require ('../pages/register.page');
const LoginPage = require ('../pages/login.page')
const CartPage = require ('../pages/cart.page');
const CheckoutPage = require ('../pages/checkout.page');
const OrderHistoryPage = require ('../pages/orderHistory.page');

let testDataFastFood = require ('../data/shop.json');
const testDataApi = require ('../data/api.json')


describe( 'Fastfood QA.rs tests', function () {
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;
    let pageCheckout;
    let pageOrderHistory;

    let packages;
    let orderId;


    before(function () {
        driver = new webdriver.Builder().forBrowser(process.env.USE_BROWSER).build();
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCart = new CartPage(driver);
        pageCheckout = new CheckoutPage(driver);
        pageOrderHistory = new OrderHistoryPage(driver);

        packages = testDataFastFood.order;
        orderId = testDataApi.orderInfo.order_id
      //  console.log(packages)
       // console.log(orderId)


    });

    after(async function () {
        await driver.quit();
    });

    beforeEach(function () {
        //--> pokrece se pre svakog testa
    });

    afterEach(function () {
        //--> pokrece se nakon svakog testa
    });

    it('Verifies if Homepage is open', async function () {

        await pageHomepage.goToHomePage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain('QA FastFood');
        expect(await pageHomepage.isOrderNowDisplayed()).to.be.true;


    });

    it('Goes to register page', async function () {

        await pageHomepage.clickOnRegisterLink();
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://test.qa.rs/register');
    });

    it('Successfully performs registration', async function () {

        await pageRegister.fillInputFirstName(testDataFastFood.registration.firstname);
        await pageRegister.fillInputLastName(testDataFastFood.registration.lastname);
        const randomNumber = pageRegister.random(10000, 100000000);
        await pageRegister.fillInputEmail(testDataFastFood.registration.email + randomNumber);
        await pageRegister.fillInputUsername(process.env.LOGIN_USERNAME + "." + randomNumber);
        await pageRegister.fillInputPassword(process.env.LOGIN_PASSWORD);
        await pageRegister.fillInputPasswordConfirm(process.env.LOGIN_PASSWORD);
        await pageRegister.getRegisterButton().click();

        expect(await pageHomepage.getSuccessAlertText()).to.contain('Success!')

    });

    it('Goes to Login page and performs login', async function () {

        await pageHomepage.goToLoginPage();
        expect(await pageLogin.isButtonLoginDisplayed()).to.be.true;

        await pageLogin.fillInputUsername(process.env.LOGIN_USERNAME);
        await pageLogin.fillInputPassword(process.env.LOGIN_PASSWORD);
        await pageLogin.getButtonLogin().click();

        expect(await pageHomepage.getWelcomeBackTitle()).to.contain('Welcome back');
    });

    it ('Empties the cart', async function(){
        await pageCart.actionEmptyCart();


    });

    it ('Adds item(s) to cart', async function (){

        for (const index in packages){
            const item = packages [index];

            //console.log(item);

            const selectedBurgerDiv  = await pageHomepage.getPackageDiv(item.package[0].toUpperCase()); /* u prvom prolazu krzo petlju
                                                                     bice selektovan div za double burger, u drugom hear attack*/
            const clear = await pageHomepage.getQuantityInput(selectedBurgerDiv);
            await clear.clear()
            const desiredQuantity = item.quantity;
            await pageHomepage.getQuantityInput(selectedBurgerDiv).sendKeys(desiredQuantity);


            const sideDishDropdownElement = pageHomepage.getSideDishDropdown(selectedBurgerDiv);
            const sideDishOptions = await pageHomepage.getSideDishOptions(sideDishDropdownElement);

            if (item.cutlery === true){
                await pageHomepage.getCutleryCheckbox(selectedBurgerDiv).click();

            }


            await Promise.all(sideDishOptions.map(async function (option){
                const text = await option.getText();



                if ( text.toString()===await (item.sideDish))  {
                    await option.click();

                    await pageHomepage.getOrderButton(selectedBurgerDiv).click();
                    expect (await pageHomepage.getCurrentUrl()).to.contain('http://test.qa.rs/');

                }

            }));
            pageHomepage.goToHomePage();


        }//zatvara for



    });
    it ('Goes to shopping cart page', async function (){
        await pageCart.goToShoppingCartPage();
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://test.qa.rs/cart');

    });

    it ('Verifies ordered Items are in cart', async function(){
        for (const index in packages) {
            const item = packages[index];

            const orderRow = await (pageCart.getOrderRow(item.package.toUpperCase()));
            const cartQuantity = await pageCart.getOrderQuantity(orderRow).getText();

            expect (await cartQuantity).to.eq(item.quantity.toString());

        };
    });




    it ('Verifies total item price is correct', async function(){

        for (const index in packages) {
            const item = packages[index];

            const orderRow = await pageCart.getOrderRow(item.package.toUpperCase());
            const itemQuantity = await pageCart.getOrderQuantity(orderRow);
            const itemPrice = await pageCart.getPricePerItem(orderRow);
            const itemPriceTotal = await pageCart.getTotalItemPrice(orderRow);

            const quantity = Number(await itemQuantity.getText());
            let price =  ((await itemPrice.getText()).replaceAll('$', ""))
            let convertedPrice = ( price.toString())
            let finallPrice = eval(convertedPrice)
            //console.log(finallPrice);
            //console.log(quantity);

            let multipliedPrice = (finallPrice * quantity).toString();
            //console.log(multipliedPrice);

            let totalItemPrice = ((await pageCart.getTotalItemPrice(orderRow).getText()).replaceAll('$', ""))

            // console.log(totalItemPrice);

            expect (totalItemPrice).to.eq((multipliedPrice));



            const TOTAL = ((await pageCart.getCartTotal().getText()).replaceAll('$', ""));
            //console.log(TOTAL);

        };

    });

    it ('Performs checkout', async function(){
        await pageCart.getCheckoutButton().click();
        expect (await pageCheckout.getCheckoutPageHeaderTitle()).to.contain('You have successfully placed your order.');
       // console.log(testDataApi.orderInfo[0])
        //console.log(testDataApi.orderInfo.order_id)



    });
    it ('Checks if order status is "paid " ', async  function (){
        await pageOrderHistory.goToOrderHistoryPage();
        expect (await pageOrderHistory.getOrderHistoryPageTitle()).to.contain('Order History');

        const orderRowInHistoryPage = await pageOrderHistory.getOrderRowInHistoryPage(orderId);



        const orderStatus = await pageOrderHistory.getOrderStatus(orderRowInHistoryPage);
        expect(await orderStatus.getText()).to.be.eq('paid');





    });

    /*it('Performs Logout', async function () {

            await pageHomepage.getLinkLogout().click();
            expect(await pageHomepage.isLoginLinkDisplayed()).to.be.true;

    }); */










});
