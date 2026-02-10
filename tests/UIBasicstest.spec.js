const {test, expect} = require('@playwright/test');
const { request } = require('node:http');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrderdetailsPage } = require('../pageobjects/OrderdetailsPage');
const { ThankyouPage } = require('../pageobjects/ThankyouPage');

//browser is a fixture to use lunch the browser and => represent the funcation 
test('First Contex testcase', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

     // This will block/abort the .jpg urls 
    page.route('**/*.{jpg, jpeg, png}', route => route.abort());

    //To print the URL and reponses which is used in application 

    page.on('request', request=> console.log((request.url)));

    page.on('response', response=> console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator('#username').fill("rahulshetty");
    await page.locator('[name="password"]').fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

});


// If there is no cookies required to load the url, we can directly pass the page url in page fixture
test('Second Testcase', async ({page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('@e2e ecommerce Site', async ({page})=>
{   
   const ProductName = "ZARA COAT 3";
   const UserName = "shruti03@gmail.com";
   const Password = "Test@123";
   const loginpage = new LoginPage(page);
  

   //Verifying login sucessfully
   await loginpage.GOTO();
   await loginpage.LoginintoApp(UserName, Password);

    const dashboardpage = new DashboardPage(page);
   // Dashboard Product selection and click on Cart
   await dashboardpage.SearchProduct(ProductName);
   await dashboardpage.ClickONCart();

    // Add Card Details on Checkout Page
   const checkoutpage = new CheckoutPage(page);
   await checkoutpage.ClickonCheckout();
   await checkoutpage.EnterCardDetail();
   await checkoutpage.SelectCountryFromList();
   await checkoutpage.ClickonPlaceOrder();

    //Order Details Page
    const orderdetailspage = new OrderdetailsPage(page);
    await orderdetailspage.ClickonOrderButton();
    await orderdetailspage.SelectPlacedOrder();

    //Thank you page
    const thankyoupage = new ThankyouPage(UserName, ProductName);
    expect(thankyoupage.ValidateOrderDetails);
    console.log(ProductName);
    
    expect (ProductName.includes(SelectedProduct)).toBeTruthy();

});