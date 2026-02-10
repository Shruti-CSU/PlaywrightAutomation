class APIutils

{
    constructor(apiContext, LoginPayload)
    {
        this.apiContext = apiContext;
        this.LoginPayload = LoginPayload;
    }
    async getToken()

    //Hit login API to collect token
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: this.LoginPayload
            }
        );

        const loginJson = await loginResponse.json();
        const token = loginJson.token;
        console.log(token);
        return token;
    }

    async CreateOrder(CreateorderPayload)

    //Hit createOrder API to create Order
    {   
        let response = {};

        response.token = await this.getToken();
        const CreateOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: CreateorderPayload,
                headers: {
                    'Authorization' : response.token,
                    'Content-Type': "application/json"
                }
            }
        );

       const CreateOrderjson = await CreateOrderResponse.json();
       console.log(CreateOrderjson);
       const OrderId = CreateOrderjson.orders[0];
       response.OrderId = OrderId;

       return response;

    }

}

module.exports = {APIutils};