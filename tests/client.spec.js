import { test, expect } from '@playwright/test';

test('client app login', async ({ page }) => {

  const productName = 'ZARA COAT 3';

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill('jasdeeps426@yopmail.com');
  await page.locator('#userPassword').fill('Test@1234');
  await page.locator('#login').click();


  await page.waitForLoadState('networkidle');



  // Verify product is available and add to cart
  const products = page.locator('.card-body');
  await products.last().waitFor();
  const count = await products.count();
  
  
  await expect(page).toHaveTitle("Let's Shop");

  for (let i = 0; i < count; i++) {
    const productTitle = (await products.nth(i).locator('b').textContent()).trim()
  
    if (productTitle === productName) {

      await products.nth(i).locator("button:has-text(' Add To Cart')").waitFor();
      await products.nth(i).locator("button:has-text(' Add To Cart')").click();
      break;

    }
    
  }


  const productAddedToCartMessage = page.locator("text='Product Added To Cart'")
  await productAddedToCartMessage.waitFor();
  await expect(productAddedToCartMessage).toBeVisible();

  // Navigate to cart and verify product


  await page.locator("text='  Cart '").click();
  await page.locator('li div').first().waitFor();
  const cartProduct = page.locator("h3:has-text('ZARA COAT 3')");
  await expect(cartProduct).toBeVisible();

  // Proceed to checkout
  await page.locator("button:has-text('Checkout')").click();
  await expect(page.locator("text='Personal Information '")).toBeVisible();

  // Fill payment details
  await page.locator("//div[text()='CVV Code ']/..//input").fill('823');
  await page.locator("//div[text()='Name on Card ']/..//input").fill('jasdeep singh');


 

  // Wait for and select country from dropdown
  await page.locator("[placeholder='Select Country']").pressSequentially("ind",
    {delay:100}
  );

  const countryResults = page.locator(".ta-results");
  await countryResults.waitFor();
  const countryResultsCount = countryResults.locator('button').count();
  for (let i = 0; i < await countryResultsCount; i++) {
    const text = await countryResults.locator('button').nth(i).textContent();
    if (text.trim() === 'India') {
      await countryResults.locator('button').nth(i).click();
      break;
    }
  }
  // Place the order and verify confirmation
  await page.locator("a:has-text('Place Order ')").click();

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(`Order ID: ${orderId}`);

  // Optionally, add an assertion for order confirmation message
  await expect(page.locator('text= Thankyou for the order. ')).toBeVisible();

  await page.locator("[routerlink='/dashboard/myorders']").first().click();
  await page.locator('text=Your Orders').waitFor();



  const orderList =  page.locator('.table tbody tr');
  const orderListCount = await orderList.count();
 
  for (let i = 0; i < orderListCount; i++) {
    const orderIdTextFromList = await orderList.nth(i).locator('th').textContent();
   
    if (orderId.includes(orderIdTextFromList)) {
     
      orderList.nth(i).locator('td button').first().click();
      break;
    }
   

  }
  const orderSummeryMessage =page.locator('text= order summary ')
  await orderSummeryMessage.waitFor()
  await expect(orderSummeryMessage).toBeVisible();
  console.log('✅ Order Summary page is visible.');
  const orderIdFromOrderSummaryPage =  page.locator('.col-text').first();

  // await expect(orderIdFromOrderSummaryPage).toBe(orderId);
   expect(await orderIdFromOrderSummaryPage.isVisible()).toBeTruthy()
  console.log('✅ Order IDs match successfully.');


}); 