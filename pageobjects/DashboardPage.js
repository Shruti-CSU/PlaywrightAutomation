class DashboardPage {

    constructor (page) {

        this.Products = page.locator(".card-body b");
        this.ProductsName = page.locator(".card-body b");
        this.cart = page.getByRole('button', { name: '   Cart' });
    }

async SearchProduct(ProductName) {    
    const Titles = await this.ProductsName.allTextContents();
    console.log(Titles);

    const count = await this.Products.count();
    console.log(count);

    for (let i = 0; i < count; i++) {

        const title = (await this.Products.nth(i).textContent())?.trim();

        if (title === ProductName) {
            await this.Products
                .nth(i)
                .locator("xpath=ancestor::div[contains(@class,'card-body')]")
                .locator("text=Add To Cart")
                .click();
            break;
        }
    }
}


async ClickONCart(){
    await this.cart.click();
}

}


module.exports = {DashboardPage};