import { test, request, expect } from "@playwright/test";
import { APIUtils } from "./utils/APIUtils";
const loginData = { userEmail: "jasdeeps426@yopmail.com", userPassword: "Test@1234" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] }

let response;


test.beforeAll('Login with API', async () => {
  const apiContext = await request.newContext()
   const apiUtils = new APIUtils(apiContext,loginData)
    response = await apiUtils.createOrder(orderPayLoad)
      
})

test('create order with API and verify it With UI', async ({ browser }) => {
    const newContext = await browser.newContext();
    const page = await newContext.newPage();
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)

    },
        response.token)

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.getByRole('listitem').getByRole('button', { name: 'ORDERS' }).waitFor()
    await page.getByRole('listitem').getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('text=Your Orders').waitFor();



    const orderList = page.locator('.table tbody tr');
    const orderListCount = await orderList.count();

    const filteredRow = orderList.filter({
        has: page.locator('th', { hasText: response.orderId })
    }).first();
    await filteredRow.getByRole('button', { name: 'View' }).click();

 
    const orderSummeryMessage = page.locator('text= order summary ')
    await orderSummeryMessage.waitFor()
    await expect(orderSummeryMessage).toBeVisible();
    console.log('✅ Order Summary page is visible.');
    const orderIdFromOrderSummaryPage =await page.locator('.col-md-6 .col-text');
   console.log("orderIdFromOrderSummaryPage" , orderIdFromOrderSummaryPage)


    expect(await orderIdFromOrderSummaryPage.textContent()).toBe(response.orderId);
    console.log(await orderIdFromOrderSummaryPage.isVisible())
    expect(await orderIdFromOrderSummaryPage.isVisible()).toBeTruthy()
    console.log('✅ Order IDs match successfully.');


});










