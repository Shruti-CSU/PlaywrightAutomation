const { test, expect } = require('@playwright/test');


test('All Elemenets Practice', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator(".radioButton").nth(1).click();
    expect(page.locator(".radioButton").nth(1)).toBeChecked();

    const Input = page.locator("#autocomplete");
    Input.pressSequentially("uni");

    await page.locator("div.ui-menu-item-wrapper").filter({ hasText: 'United States (USA)' }).click();
    await expect(Input).toHaveValue("United States (USA)");

    await page.locator('#dropdown-class-example').selectOption('option2');
    await expect(page.locator('#dropdown-class-example')).toHaveValue('option2');

    await page.locator('#checkBoxOption2').click();
    await expect((page.locator('#checkBoxOption2'))).toBeChecked();

    //Child Window 

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),  // wait for the new page
        page.locator('#openwindow').click() // trigger that opens the new page
    ]);

    await childPage.waitForLoadState(); // ensure child page is loaded
    const EmailID = await childPage.getByText('info@qaclickacademy.com').first().textContent();
    console.log(EmailID);

    const [newTab] = await Promise.all([context.waitForEvent('page'), page.locator("#opentab").click()]);

    await newTab.waitForLoadState();

    const Timing = await newTab.locator(".header-opening-time").textContent();
    console.log(Timing);

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept(); // or dialog.dismiss()
    });

    await page.locator('#alertbtn').click();
    await page.locator('#confirmbtn').click();


    await page.locator('#mousehover').hover();


});


