import { test, expect } from '@playwright/test';

let webContext;

test.beforeAll("Login with UI and store session storage for new login", async ({browser})=>
{

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill('jasdeeps426@yopmail.com');
  await page.locator('#userPassword').fill('Test@1234');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle')
  await context.storageState({path:'state.json'})   //store session storage for new login
  
  webContext= await browser.newContext({storageState:'state.json'})  //send stred session to newcontext for login
 
  await context.close()

})
test('client app login with session storage', async () => {

  const productName = 'ZARA COAT 3';

  
  const page = await webContext.newPage()
  await page.goto('https://rahulshettyacademy.com/client/');
  
  await page.waitForLoadState('networkidle');



  // Verify product is available and add to cart
  const products = page.locator('.card-body');
  await products.last().waitFor();
  const count = await products.count();
  
  
  await expect(page).toHaveTitle("Let's Shop");

  

}); 

test('client app login with session storage 2 ', async ({ }) => {

  const productName = 'ZARA COAT 3';

  const page = await webContext.newPage()

  await page.goto('https://rahulshettyacademy.com/client/');
  
  await page.waitForLoadState('networkidle');



  // Verify product is available and add to cart
  const products = page.locator('.card-body');
  await products.last().waitFor();
  const count = await products.count();
  
  
  await expect(page).toHaveTitle("Let's Shop");

  

}); 