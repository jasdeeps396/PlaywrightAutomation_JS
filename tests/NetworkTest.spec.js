import { test, request, expect } from "@playwright/test";
import { APIUtils } from "./utils/APIUtils";
import { json } from "stream/consumers";
import { execPath } from "process";
const loginData = { userEmail: "jasdeeps426@yopmail.com", userPassword: "Test@1234" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

const fakeResponse = {data:[],message:"No Orders"}


let response

test.beforeAll('Login with API', async () => {
  const apiContext = await request.newContext()
   const apiUtils = new APIUtils(apiContext,loginData)
    response = await apiUtils.createOrder(orderPayLoad)
      
})

test('intercepting the response', async ({ browser }) => {
    const newContext = await browser.newContext();
    const page = await newContext.newPage();
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)

    },
        response.token)

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

  async route => 
    {

       const response1= await page.request.fetch(route.request())
       console.log("Response" , response)
       let body =  JSON.stringify(fakeResponse)
       console.log("Body ", body)
       await route.fulfill(
        {
            response1,
            body
        }
       )
    })

  

    await page.getByRole('listitem').getByRole('button', { name: 'ORDERS' }).waitFor()
    await page.getByRole('listitem').getByRole('button', { name: 'ORDERS' }).click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    const noOrder =await page.locator(".mt-4").textContent()
    expect(noOrder).toEqual(" You have No Orders to show at this time. Please Visit Back Us ")
    console.log(noOrder)





});










