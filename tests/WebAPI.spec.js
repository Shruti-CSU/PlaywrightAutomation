    const {test, expect, request} = require('@playwright/test');
    const { APIutils } = require('../Utils/APIutils');
    const LoginPayload = {userEmail:"shruti03@gmail.com", userPassword:"Test@123"};
    const CreateorderPayload = {orders: [{country: "United Kingdom", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
    let response;

    test.beforeAll( async ()=>
    {
        const apiContext = await request.newContext();
        const apiutils = new APIutils(apiContext, LoginPayload);
        response = await apiutils.CreateOrder(CreateorderPayload);
    });


    test('@e2e ecommerce Site', async ({page})=>
        {   
            await page.addInitScript(value => {
                
                window.localStorage.setItem('token', value)
            
            }, response.token);
            await page.goto("https://rahulshettyacademy.com/client");

            await page.locator("button[routerlink*='myorders']").click();
            await page.locator("tbody").waitFor();
    
             const raws = page.locator("tbody tr");
            for (let i=0; i< await raws.count(); ++i) {

            const rawOrderId = await raws.nth(i).locator("th").textContent();
            {

                if (response.OrderId.includes(rawOrderId)) {
                    await raws.nth(i).locator("button").first().click();
                    break;

                }}
            }

            await expect(page.locator(".tagline")).toHaveText("Thank you for Shopping With Us");

            const orderIdDetails =await page.locator(".col-text").textContent();
            //await page.pause();
            expect(response.OrderId.includes(orderIdDetails)).toBeTruthy();

});


