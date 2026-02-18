const { When, Then, Given, context } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { expect } = require('@playwright/test');


Given('a login into Ecommerce Application with {string} and {string}', { timeout: 100 * 1000 }, async function (UserName, Password) {
    const loginpage = this.pomanager.getLoginPage();
    //Verifying login sucessfully
    await loginpage.GOTO();
    await loginpage.LoginintoApp(UserName, Password);
});

When('Add {string} to cart', async function (ProductName) {
    const dashboardpage = this.pomanager.getDashboardPage();
    //Dashboard Product selection and click on Cart
    await dashboardpage.SearchProduct(ProductName);
    await dashboardpage.ClickONCart();
});

Then('Verify {string} is displayed in the cart', async function (string) {
    const checkoutpage = this.pomanager.getCheckoutPage();
    await checkoutpage.ClickonCheckout();
});

When('Enter Valid details and place the order', async function () {
    const checkoutpage = this.pomanager.getCheckoutPage();
    await checkoutpage.EnterCardDetail();
    await checkoutpage.SelectCountryFromList();
    await checkoutpage.ClickonPlaceOrder();
});


Then('Verify orderdetails in the order history', async function () {

    const OrderdetailsPage = this.pomanager.getOrderDetailPage();
    await OrderdetailsPage.ClickonOrderButton();
    await OrderdetailsPage.SelectPlacedOrder();
    const thankyoupage = this.pomanager.getThankyouPage();
    expect(thankyoupage.ValidateOrderDetails);
});

Given('search for the right product', async function () {
    const loginPage = this.pomanager.getLoginPage();
    await loginPage.Pandora();
});

When('Visit the products from the list', async function () { 
    const SelectProductPage = this.pomanager.getDashboardPage();
});

Then('Select second product and store', { timeout: 100 * 1000 }, async function () {
    const SelectProductPage = this.pomanager.getDashboardPage();
    await SelectProductPage.SelectPandoraProduct();
    await SelectProductPage.SelectStore();
});

When('Visit other product and add third product to cart', async function () {
    const SelectProductPage = this.pomanager.getDashboardPage();
    await SelectProductPage.SelectThirdProduct();
});

Then('Verify Added products', async function () {
    const VerifyProduct = this.pomanager.getCheckoutPage();
    await VerifyProduct.VerifyPandoraProduct();
});
