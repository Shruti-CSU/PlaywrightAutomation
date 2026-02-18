Feature: Search For the right product and add into Cart

    Scenario Outline: Placing the order
        Given search for the right product
        When Visit the products from the list
        Then Select second product and store
        When Visit other product and add third product to cart
        Then Verify Added products