import { test } from "@playwright/test";
import { request } from "http";

test("scurity test request intercept continue method", async ({ page }) => {

    // page.route('**/*.{css}', async route =>await route.abort())  // this used for abort anything tobe loaded
 
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url() , response.status()))

    page.goto("https://rahulshettyacademy.com/client")
    await page.locator('#userEmail').fill('jasdeeps426@yopmail.com');
    await page.locator('#userPassword').fill('Test@1234');
    await page.locator('#login').click();


    await page.waitForLoadState('networkidle');

await page.locator("[routerlink*=myorders]").click()
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route => {
            route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
        }


    )
    await page.locator("button:has-text('View')").first().click()
    // await page.pause()
})