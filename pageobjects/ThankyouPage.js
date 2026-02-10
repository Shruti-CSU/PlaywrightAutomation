class ThankyouPage {
    constructor(page, ProductName) {
        this.page = page;
        this.ProductName = ProductName;

        this.ThankyouMessage = page.locator(".tagline");
        this.UserNameAddress = page.locator(".address p").first();
        this.SelectedCountry = page.locator(".address p").last();
        this.SelectedProduct = page.locator(".title");
    }

async ValidateOrderDetails (UserName, ProductName) 
{
    this.ThankyouMessage.toHaveText("Thank you for Shopping With Us");
    this.UserNameAddress.toHaveText(UserName);
    this.SelectedCountry.toHaveText(" Country - United States ");
    this.ProductName = this.SelectedProduct.textContent().trim();
}


}

module.exports = {ThankyouPage};