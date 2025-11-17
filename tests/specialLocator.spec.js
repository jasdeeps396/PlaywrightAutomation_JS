import { test ,expect } from '@playwright/test';
test('special character locator', async({page})=>{
   await page.goto('https://rahulshettyacademy.com/angularpractice/');

   await page.getByText('Submit').waitFor()
   await page.locator("input[name='name']").first().fill("jasdeep singh")
   await page.locator("input[name='email']").fill("jasdeeps426@yopmail.com")
   await page.getByPlaceholder('Password').fill("est@1234")
   await page.getByLabel('Check me out if you Love IceCreams!').check();
   await page.getByLabel('Gender').selectOption("Male")
   await page.getByLabel('Student').click();
   await page.getByRole('button',{name:'Submit'}).click()
   await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
   console.log("✅ Success! The Form has been submitted successfully!. ---- is visible")



   await page.getByRole('link',{name:'Shop'}).click()
   await page.getByText("Shop Name").waitFor()
   await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
})