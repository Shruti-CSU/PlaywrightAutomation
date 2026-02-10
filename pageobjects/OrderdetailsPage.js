class OrderdetailsPage 
{
    constructor (page) 
    {   
        this.page = page;
        this.ClickonOrder = page.locator("button[routerlink='/dashboard/myorders']");
        this.raws = page.locator("tbody tr");
    
    }

async ClickonOrderButton () 
{
    await this.ClickonOrder.click();
}

async SelectPlacedOrder(page) 
{   
    const orderID = await this.page.locator(".em-spacer-1 label").last().textContent();
    console.log(orderID);

    await this.page.locator("button[routerlink='/dashboard/myorders']").click();

    await this.page.locator("tbody").waitFor();
    
    const raws = this.page.locator("tbody tr");
    for (let i=0; i< await raws.count(); ++i) {

       const rawOrderId = await raws.nth(i).locator("th").textContent();
       {

        if (orderID.includes(rawOrderId)) {
            await raws.nth(i).locator("button").first().click();
            break;

        }}
     }
}

}

module.exports = {OrderdetailsPage};