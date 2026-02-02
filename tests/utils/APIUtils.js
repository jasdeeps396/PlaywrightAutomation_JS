class APIUtils
{

    constructor(apiContext, loginData)
    {
        this.apiContext=apiContext
        this.loginData=loginData
    }

    

   async getToken()
    {
     const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {

        data: this.loginData,

    })
    const loginResponseJson =await loginResponse.json()
    const token =await loginResponseJson.token;
    return token;
    
    }

    async createOrder(orderPayLoad)

    {  

        let response = {};
        response.token=await this.getToken()
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayLoad
                    ,
                    headers: {
                        'Authorization': response.token,
                        'Content-type': "application/json"
        
                    }
        
        
                })
        
            
            const createOrderResponseJson = await createOrderResponse.json()
            
        response.orderId = createOrderResponseJson.orders[0]

        return response;
            
    }
}


module.exports= {APIUtils}