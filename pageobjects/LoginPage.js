class LoginPage {

    constructor (page) {

        this.page = page;
        this.LoginButton = page.locator('[name="login"]');
        this.LoginEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

async LoginintoApp (UserName, Password) {

    await this.LoginEmail.fill(UserName);
    await this.password.fill(Password);
    await this.LoginButton.click();
    await this.page.waitForLoadState('networkidle');
}

async GOTO (page) {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

}

module.exports = {LoginPage};