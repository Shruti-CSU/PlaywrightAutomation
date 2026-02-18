const { test, expect } = require('@playwright/test');


test.skip('Login into Pandora AC', async ({ page }) => {
    await page.goto("https://us.pandora.net/");
    await page.locator("li.css-k008qs").first().click();
    await page.locator("#login-form-email").fill("sunny@dummyinbox.com");
    await page.locator("#login-form-password").fill("Test@123");
    await page.getByRole("button", { name: 'SIGN-IN AND CONTINUE' }).click();
});


test.only('Scenarios Without Login', async ({ page }) => {
    await page.goto("https://us.pandora.net/");
    
    await page.locator("a[class='chakra-link css-ekq69x']").last().click();
    await page.locator("p[itemprop='name']").filter().getByText("Disney Stitch Rose Murano Glass Charm").click();
    await expect(page.locator("h1[class='chakra-text css-1ge7mcu']")).toHaveText("Disney Stitch Rose Murano Glass Charm");

    await page.locator("a[data-testid='moreLinkDetails']").click();

    await expect(page.locator("h2[class='chakra-text css-leune8']").first()).toHaveText("Sterling silver");

    const ProductID = await page.locator(".chakra-text.css-812xwp").textContent();
    console.log(ProductID);

    await page.locator(".chakra-link.css-beydtl").click();

    await expect(page.locator("p[data-auto='addToBagDefaultProductPrice']")).toHaveText("$98.00");

    await page.locator("span.chakra-text.css-uglap3").click();
    await page.locator("#postalCode").fill("44114");
    await page.locator("button.chakra-button.css-imbl3t").click();

    await page.locator(".css-183oxd5").first().waitFor();
    
    const StoreName = page.locator(".css-183oxd5").first();
    console.log(StoreName.textContent());

    await StoreName.getByRole("button", {name: 'SELECT STORE'}).click();

    await expect(page.locator("p.chakra-text.css-13bpz2u").first()).toHaveText("Pandora @ Beachwood Place Mall");

    await page.locator("p.chakra-text.css-1uy0bwa").filter({hasText: 'Disney Stitch Holiday Charm'}).click();
    //await page.screenshot('Pandora.png')

    await page.locator("div.css-uglap3").click();
    const AddedtoCart = await page.getByText("Added").textContent();
    console.log(AddedtoCart);

    await page.locator("p.chakra-text.css-1uy0bwa").filter({hasText: 'Holiday Wreath Double Dangle Charm'}).click();
    await expect(page.locator("h1.chakra-text.css-1ge7mcu")).toHaveText("Holiday Wreath Double Dangle Charm");
    
    await page.pause();
    await page.locator("div.css-uglap3").click(); 
    await page.locator("div.css-uglap3").click(); 
   // await page.pause();
    
    await page.getByTestId("mini-cart-cta-cart").click({ force: true });

    //await expect(page.locator(".progress-message")).toHaveText("CONGRATS! 25% OFF WITH $125 SPEND");
    await expect(page.locator("span.minicart-quantity.minicart-quantity-circle")).toHaveCount(1);
    //await expect(page.locator("p.text-right.sub-total")).toHaveText("$187.50");
    await expect(page.locator("p.text-right.shipping-discount.free-shipping-label")).toHaveText("Free");
    
    // await page.locator("a.link.suggestionhit.link-no-underline").filter({hasText: 'Pandora Pink Premium Gift Packaging'}).click({ force: true });
    // await page.locator("div.css-uglap3").click();
    // await page.getByTestId("mini-cart-cta-cart").click();

    // await page.locator("button[aria-label='Add Quantity']").last().click();
    // await expect(page.locator("##quantity-67855377e38f29a7a58ba6f06e")).toHaveCount(2);

    await expect(page.locator("span.minicart-quantity.minicart-quantity-circle")).toHaveCount(1);
    //await expect(page.locator("p.text-right.sub-total")).toHaveText("$137.50");
    await expect(page.locator("p.text-right.shipping-discount.free-shipping-label")).toHaveText("Free");

    await page.getByRole("button",{ name:'CHEKCOUT'}).click();
});