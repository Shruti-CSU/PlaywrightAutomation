
// const { test, expect } = require('@playwright/test');
// const { SLoginPage } = require('../SFramework/SLoginPage');
// const dataset = JSON.parse(JSON.stringify(require('../Utils/SaathiyaTestData.json')));

// for (const data of dataset) {
//     test(`Login into App with ${data.Email}`, async ({ page }) => {

//         // const Email = "sneha@dummyinbox.com";
//         // const Password = "123456789";
//         await page.goto("https://saathiya-web.vercel.app/");
//         const sloginpage = new SLoginPage(page);
//         await sloginpage.LoggedIn(data.Email, data.Password);


//     });
// }