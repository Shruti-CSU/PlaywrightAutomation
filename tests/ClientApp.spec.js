const{test, expect} = require('@playwright/test');


test('Assignemnt 01 Testcase', async ({page})=>

    // We can direct call page fixture as we dont have any cookie to load in browser
{
    const email = page.locator("[type='email']");
    const password = page.locator("#userPassword");
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // This is registration part

    await page.locator(".btn1").click();
    await page.locator("#firstName").fill("Shruti");
    await page.locator("#lastName").fill("Soni");
    await email.fill("shruti03@gmail.com");

    await page.locator("[formcontrolname='occupation']").selectOption("Engineer");
    await expect(page.locator("[formcontrolname='occupation']")).toContainText("Engineer");
    
    await page.locator("[value='Female']").click()
    await expect(page.locator("[value='Female']")).toBeChecked();

    // This to pause a automation to see the visulization
    //await page.pause();
    await page.locator("#userMobile").fill("9874563210");
    await password.fill("Test@123");
    await page.locator("#confirmPassword").fill("Test@123");
    await page.locator("[type='checkbox']").click()
    await page.locator("[value='Register']").click();
    await expect(page.locator(".headcolor")).toContainText("Successfully");
    await page.locator(".btn-primary").click();

    });

    
test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })

test('@e2e ecommerce Site', async ({page})=>
{   
   const ProductName = "ZARA COAT 3";
   const products = page.locator(".card-body");
   const UserName = "shruti03@gmail.com";
   const Password = "Test@123";

   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userPassword").fill("Test@123");
   await page.locator('[name="login"]').click();

   // This will verify email address error
   const emailError = await page.locator(".invalid-feedback").first().textContent();
   expect(emailError).toContain("*Email is required");
   await page.locator("#userEmail").fill("shruti03@gmail.com");
   await page.locator('[name="login"]').click();

   //Verifying login sucessfully
   console.log(await page.title());
   await expect(page).toHaveTitle("Let's Shop");

   await page.locator(".card-body b").first().waitFor();
   const Titles = await page.locator(".card-body b").allTextContents();
   console.log(Titles);

   const count = await products.count();
   console.log(count);

   for(let i = 0; i < count; ++i)
   {
    if(await products.nth(i).locator("b").textContent() === ProductName)
    {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy;
   console.log(bool);

   const  subtotal = await page.locator("span[class='value']").nth(1).textContent();
   //await expect(page.locator("span[class='value']")).toHaveText("$11500");

   await page.locator("[class*='btn-primary']").last().click();
   await page.locator(".field input").first().clear();
   await page.locator(".field input").first().fill("4542 9931 9292 2292");
   console.log(await page.locator(".field input").first().textContent());

   const cvvcode = page.locator(".field:has-text('CVV Code ') input");
   await cvvcode.fill("123");
   
   const CardName = page.locator(".field:has-text('Name on Card ') input");
   await CardName.fill("Shruti Soni");

   await page.locator("[name='coupon']").fill("rahulshettyacademy");
   await page.locator("[type='submit']").click();

   const CouponApply = await page.locator("[style*= green]").textContent();
   expect(CouponApply).toContain("* Coupon Applied");

   const Email = await page.locator("[style*=lightgray]").textContent();
   expect(Email).toContain("shruti03@gmail.com");

   await page.locator("[placeholder='Select Country']").pressSequentially("uni");

   const countryList = page.locator(".ta-results");
   await countryList.waitFor();

   const countySelect = await countryList.locator("button").count();
   console.log(countySelect)

   for ( let i=0; i<countySelect; ++i) {

    const country = await countryList.locator("button").nth(i).textContent();
    if (country === " United States") {

        await countryList.locator("button").nth(i).click();
        break;
    }}

    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

    const orderID = await page.locator(".em-spacer-1 label").last().textContent();
    console.log(orderID);

    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();
    
    const raws = page.locator("tbody tr");
    for (let i=0; i< await raws.count(); ++i) {

       const rawOrderId = await raws.nth(i).locator("th").textContent();
       {

        if (orderID.includes(rawOrderId)) {
            await raws.nth(i).locator("button").first().click();
            break;

        }}
     }

    await expect(page.locator(".tagline")).toHaveText("Thank you for Shopping With Us");

    const SuccessOrderId = await page.locator(".col-text").textContent();
    expect (orderID.includes(SuccessOrderId)).toBeTruthy();

    expect (page.locator(".address p").first()).toHaveText(" shruti03@gmail.com ");
    expect (page.locator(".address p").last()).toHaveText(" Country - United States ");
    
    const SucessProduct = (await page.locator(".title").textContent()).trim();
    console.log(SucessProduct);
    
    expect (ProductName.includes(SucessProduct)).toBeTruthy();

});

test('@e2e test using Getby method', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("shruti03@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Test@123");
    await page.getByRole("button", {name: 'Login'}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    // first we will scan entire window then we can add filter on that specific frame to serach for the other element
    await page.locator(".card-body").filter({hasText: "IPHONE 13 PRO"}).getByText("Add To Cart").click();
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();

    expect(page.getByText("iphone 13 pro")).toBeVisible;

    await page.getByRole("button", {name: 'Checkout'}).click();

    //await expect(page.getByPlaceholder("shruti03@gmail.com")).toBeVisible();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", {name: "India"}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    const orderID = (await page.locator(".em-spacer-1 label").last().innerText()).split('|')[1].trim();
    console.log(orderID);

    await page.getByText("Orders History Page").click();

    await page.locator("tbody").first().waitFor();

    await page.locator("tbody tr").filter({hasText: orderID}).getByText("View").click();
    await expect(page.getByText("Thank you for Shopping With Us")).toBeVisible();

    await expect(page.locator(".col-text")).toContainText(orderID);
});

test('Calender Test', async ({page})=>{

    const Date = "17";
    const Month = "01";
    const Year = "2029";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button__icon").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();

    await page.getByText(Year).click();
    await page.locator(".react-calendar__tile").nth(Number(Month)-1).click();
    await page.locator("//abbr[text()='"+Date+"']").click();

})


// test('Calender Test 02', async ({page})=> {

//     const Year = "2028";
//     const Month = "7";
//     const Date = "17";

//     await page.goto("https://qa-automation-practice.netlify.app/calendar");
//     await page.locator("#calendar").click();
//     await page.getByText("January 2026").click();
//     await page.locator('.datepicker-months th').filter({ hasText: '2026' }).click();

//     await page.locator("span[class='year']").filter({ hasText: Year}).click();
//     await page.locator("span[class='month']").nth(Number(Month)-1).click();
//     await page.locator("td[class='day']").nth(Date).click();
//     const SelectedDate = await page.getByRole('textbox', { name: 'Pick a date' }).textContent();
    
//     console.log(SelectedDate);

// })



test('Generetated from codegen test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.getByRole('link', { name: 'ProtoCommerce Home' }).click();
  await expect(page.getByRole('list')).toContainText('Shop');
  await page.getByRole('link', { name: 'Shop' }).click();
  await expect(page.locator('h1')).toContainText('Shop Name');
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.getByText('Checkout ( 1 ) (current)').click();
  await expect(page.locator('h4')).toContainText('Samsung Note 8');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('uni');
  await page.getByText('United States of America').click();
  await page.getByText('I agree with the term &').click();
  await expect(page.getByRole('button')).toContainText('Purchase');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByRole('strong')).toContainText('Success!');
});