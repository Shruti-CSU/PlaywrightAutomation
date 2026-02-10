class CheckoutPage {

    constructor(page) {

        this.page = page;
        this.CheckoutButton = page.getByRole("button", { name: 'Checkout' });
        this.CardNum = page.getByRole('textbox').nth(0);;
        this.Cvv = page.locator("input[class='input txt']").first();
        this.CardName = page.locator("input[class='input txt']").last();
        this.CoupounCode = page.locator("input[name='coupon']");
        this.ApplyCoupoun = page.locator("button:has-text('Apply')");
        this.countryList = page.locator(".ta-results");
        this.PlaceOrderButton = page.locator(".action__submit");

    }

    async ClickonCheckout() {
        await this.CheckoutButton.click();
    }

    async EnterCardDetail() {

        await this.CardNum.waitFor({ state: "visible" });
        await this.CardNum.clear();
        await this.CardNum.fill("4542 9931 9292 2292");
        await this.Cvv.fill("456");
        await this.CardName.fill("Shruti Soni");
        await this.CoupounCode.fill("rahulshettyacademy");
        await this.ApplyCoupoun.click();
    }

    async SelectCountryFromList(page) {

        const countryInput = this.page.locator("[placeholder='Select Country']");
        await countryInput.click();  
        await countryInput.pressSequentially("uni");

        await this.countryList.waitFor({ state: "visible", timeout: 5000 });


        const countySelect = await this.countryList.locator("button").count();
        console.log(countySelect)

        for (let i = 0; i < countySelect; ++i) {

            const country = await this.countryList.locator("button").nth(i).textContent();
            if (country === " United States") {

                await this.countryList.locator("button").nth(i).click();
                break;
            }
        }

    }

async ClickonPlaceOrder () {
    await this.PlaceOrderButton.click();
}
}

module.exports = { CheckoutPage };