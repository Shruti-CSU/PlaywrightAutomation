class DashboardPage {

    constructor (page) {

        this.Products = page.locator(".card-body b");
        this.ProductsName = page.locator(".card-body b");
        this.cart = page.getByRole('button', { name: '   Cart' });
        this.firstProduct = page.locator("a[class='chakra-link css-ekq69x']");
        this.filterProduct = page.locator("p[itemprop='name']");
        this.moreDetail = page.locator("a[data-testid='moreLinkDetails']");
        this.secondProduct = page.locator(".chakra-link.css-beydtl");
        this.selectStorebtn = page.locator("span.chakra-text.css-uglap3");
        this.addPincode = page.locator("#postalCode");
        this.findStore = page.locator("button.chakra-button.css-imbl3t");
        this.finalStore = page.locator(".css-183oxd5");
        this.thirdProduct = page.locator("p.chakra-text.css-1uy0bwa");
        this.add3Product = page.locator("div.css-uglap3");
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


async SelectPandoraProduct(){

    await this.firstProduct.last().click();
    await this.filterProduct.filter().getByText("Disney Stitch Rose Murano Glass Charm").click();
    await this.moreDetail.click();
    await this.secondProduct.click(); 
}

async SelectStore(){
    await this.selectStorebtn.click();
    await this.addPincode.fill("44114");
    await this.findStore.click();
    await this.finalStore.first().waitFor();
    
    const StoreName = this.finalStore.first();
    console.log(StoreName.textContent());

    await StoreName.getByRole("button", {name: 'SELECT STORE'}).click();

}

async SelectThirdProduct () {
    await this.thirdProduct.filter({hasText: 'Disney Stitch Holiday Charm'}).click();
    await this.add3Product.click();
}

}


module.exports = {DashboardPage};