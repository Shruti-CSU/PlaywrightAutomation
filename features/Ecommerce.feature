Feature: Place order from E-commerce site

    @Regression
    Scenario Outline: Placing the order
        Given a login into Ecommerce Application with "<UserName>" and "<Password>"
        When Add "<ProductName>" to cart
        Then Verify "<ProductName>" is displayed in the cart
        When Enter Valid details and place the order
        Then Verify orderdetails in the order history

        Examples:
            | UserName           | Password  | ProductName |
            | shruti03@gmail.com | Test@123  | ZARA COAT 3 |


