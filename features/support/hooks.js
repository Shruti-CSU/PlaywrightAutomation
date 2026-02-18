const { POManager } = require('../../pageobjects/POManager');
const  playwright  = require('@playwright/test');
const {Before, After, Status, BeforeStep, AfterStep} = require('@cucumber/cucumber');

Before (async function () {
    const browser = await playwright.chromium.launch({headless : false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pomanager = new POManager(this.page);
});

BeforeStep ( function () {
    console.log("This will execute before each step")
});

AfterStep ( async function( {result}) {
    if (result.status == Status.FAILED) {
        await this.page.screenshot({path : "cucumberS.png"})
    }
});

After ( function () {
     console.log("This is the last step")
});