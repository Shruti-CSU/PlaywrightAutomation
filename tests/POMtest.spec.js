const {test, expect} = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const { ThankyouPage } = require('../pageobjects/ThankyouPage');

// To Import Json we need to first convert it in String and then JS so JSON => String => JS script
const dataset = JSON.parse(JSON.stringify(require('../Utils/PlaceorderTestData.json')));

test('@e2e ecommerce Site', async ({page})=>
{   
  
   const pomanager = new POManager(page);

   const loginpage = pomanager.getLoginPage();
   //Verifying login sucessfully
   await loginpage.GOTO();
   await loginpage.LoginintoApp(dataset.UserName, dataset.Password);

    const dashboardpage = pomanager.getDashboardPage();
   // Dashboard Product selection and click on Cart
   await dashboardpage.SearchProduct(dataset.ProductName);
   await dashboardpage.ClickONCart();

    // Add Card Details on Checkout Page
   const checkoutpage = pomanager.getCheckoutPage();
   await checkoutpage.ClickonCheckout();
   await checkoutpage.EnterCardDetail();
   await checkoutpage.SelectCountryFromList();
   await checkoutpage.ClickonPlaceOrder();

    //Order Details Page
    const OrderdetailsPage = pomanager.getOrderDetailPage();
    await OrderdetailsPage.ClickonOrderButton();
    await OrderdetailsPage.SelectPlacedOrder();

    //Thank you page
    const thankyoupage = pomanager.getThankyouPage();
    expect(thankyoupage.ValidateOrderDetails);
    console.log(dataset.ProductName);

});