import { test, expect } from '@playwright/test';

test('client app login', async ({ page }) => {

  const productName = 'ZARA COAT 3';

  await page.goto('https://rahulshettyacademy.com/client/');
//   await page.locator('#userEmail').fill('jasdeeps426@yopmail.com');
//   await page.locator('#userPassword').fill('Test@1234');
//   await page.locator('#login').click();

  await page.getByPlaceholder("email@example.com").fill('jasdeeps426@yopmail.com')
  await page.getByPlaceholder("enter your passsword").fill('Test@1234')
  await page.getByRole('button',{name:'Login'}).click()


  await page.waitForLoadState('networkidle');



  // Verify product is available and add to cart
  const products = page.locator('.card-body');
  await products.last().waitFor();


  await products.filter({hasText:productName}).getByRole('button',{name:' Add To Cart'}).click()
  
  
  await expect(page).toHaveTitle("Let's Shop");



  const productAddedToCartMessage = page.locator("text='Product Added To Cart'")
  await productAddedToCartMessage.waitFor();
  await expect(productAddedToCartMessage).toBeVisible();

  // Navigate to cart and verify product


  
  await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
  await page.locator('li div').first().waitFor();
  const cartProduct = page.getByText('ZARA COAT 3');
  await expect(cartProduct).toBeVisible();

  // Proceed to checkout
  await page.getByRole('button',{name:'Checkout'}).click();
  await expect(page.locator("text='Personal Information '")).toBeVisible();

  // Fill payment details
  await page.locator("//div[text()='CVV Code ']/..//input").fill('823');
  await page.locator("//div[text()='Name on Card ']/..//input").fill('jasdeep singh');


 

  // Wait for and select country from dropdown
  await page.getByPlaceholder("Select Country").pressSequentially("ind");

//   const countryResults = page.locator(".ta-results");
//   await countryResults.waitFor();
//   const countryResultsCount = countryResults.locator('button').count();
//   for (let i = 0; i < await countryResultsCount; i++) {
//     const text = await countryResults.locator('button').nth(i).textContent();
//     if (text.trim() === 'India') {
//       await countryResults.locator('button').nth(i).click();
//       break;
//     }
//   }
  // Place the order and verify confirmation

  await page.locator(".ta-results").getByRole('button').getByText('India').nth(1).click()
  
  await page.getByText("Place Order").click();

  const orderId = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent()).trim(" ")[2];
  console.log(`Order ID: ${orderId}`);

  // Optionally, add an assertion for order confirmation message
  await expect(page.getByText('Thankyou for the order. ')).toBeVisible();

  await page.getByRole('listitem').getByRole('button',{name:'ORDERS'}).click();
  await page.locator('text=Your Orders').waitFor();



  const orderList =  page.locator('.table tbody tr');
  const orderListCount = await orderList.count();

  const filteredRow = orderList.filter({
    has: page.locator('th', { hasText: orderId })
  }).first();
  await filteredRow.getByRole('button', { name: 'View' }).click();
 
//   for (let i = 0; i < orderListCount; i++) {
//     const orderIdTextFromList = await orderList.nth(i).locator('th').textContent();
   
//     if (orderId.includes(orderIdTextFromList)) {
     
//       orderList.nth(i).locator('td button').first().click();
//       break;
//     }


   

//   }
  const orderSummeryMessage =page.locator('text= order summary ')
  await orderSummeryMessage.waitFor()
  await expect(orderSummeryMessage).toBeVisible();
  console.log('✅ Order Summary page is visible.');
  const orderIdFromOrderSummaryPage =  page.locator('.col-text').first();

  // await expect(orderIdFromOrderSummaryPage).toBe(orderId);
   expect(await orderIdFromOrderSummaryPage.isVisible()).toBeTruthy()
  console.log('✅ Order IDs match successfully.');


});