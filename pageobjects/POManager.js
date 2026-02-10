const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CheckoutPage } = require('./CheckoutPage');
const { OrderdetailsPage } = require('./OrderdetailsPage');
const { ThankyouPage } = require('./ThankyouPage');

class POManager {
    constructor (page, UserName, ProductName) {

        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.checkoutpage = new CheckoutPage(this.page);
        this.orderdetailspage = new OrderdetailsPage(this.page);
        this.thankyoupage = new ThankyouPage(this.page, this.UserName, this.ProductName);
    }

getLoginPage () {
    return this.loginpage;
}

getDashboardPage() {
    return this.dashboardpage;
}

getCheckoutPage(){
    return this.checkoutpage;
}

getOrderDetailPage(){
    return this.orderdetailspage;
}

getThankyouPage(){
    return this.thankyoupage;
}

}

module.exports = {POManager};

