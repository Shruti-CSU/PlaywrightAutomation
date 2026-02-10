const {test, expect, request} = require('@playwright/test');
const { APIutils } = require('../Utils/APIutils');

const LoginPayload = {userEmail:"shruti03@gmail.com", userPassword:"Test@123"};
const CreateorderPayload = {orders: [{country: "United Kingdom", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;    

test.beforeAll('@API Login with API', async ()=>
{
    const apiContext = await request.newContext();
    const apiutils = new APIutils(apiContext, LoginPayload);
    response = await apiutils.CreateOrder(CreateorderPayload);

});


test('@API Network Intercept using fakepayload', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    // This is getorder API URL and we have added * at the end instead of ID
    // Which means if you change the user this * will accept that new user ID

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill (
                {
                    response,
                    body,
            });
        });

    await page.locator("button[routerlink*='myorders']").click();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());

});


test('Network intercept using manuplatiing orderdetailsRUL', async ({page})=>
{
     page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route => route.continue(
            { url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"}
        )
    )

    await page.locator("button:has-text('View')").first().click();
    //await page.pause();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    
});