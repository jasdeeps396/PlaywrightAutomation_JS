// const {test} = require("@playwright/test")

import { expect, test } from '@playwright/test'




test("launch automation practice with page", async ({ page }) => {
    const userNameField = page.locator("#username")
    const passwordField = page.locator("input[name='password']")
    const signInBtn = page.locator("#signInBtn")
    const cardTitle = page.locator(".card-title a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    console.log(await page.title())
    await userNameField.fill("rahulshetty")
    await passwordField.fill("learning");
    await signInBtn.click();
    const recievedText = await page.locator("[style*='block']").textContent();
    console.log(recievedText)

    expect(recievedText).toContain("Incorrect username/password")


    await userNameField.fill("")
    await userNameField.fill("rahulshettyacademy")
    await signInBtn.click();

    // console.log(await cardTitle.first().textContent())
    // console.log(await cardTitle.nth(1).textContent())


    console.log(await cardTitle.allInnerTexts())
    console.log(await cardTitle.allTextContents())





})

test("UI Controls", async ({ page }) => {


    const userNameField = page.locator("#username")
    const passwordField = page.locator("input[name='password']")
    const signInBtn = page.locator("#signInBtn")
    const cardTitle = page.locator(".card-title a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")


    await userNameField.fill("rahulshettyacademy")
    await passwordField.fill("learning")

    await page.locator("select.form-control").selectOption("consult")


    await page.locator(".customradio .radiotextsty").last().click()

    await page.locator("#okayBtn").click()

    console.log(await page.locator(".customradio .radiotextsty").last().isChecked())
    await expect(page.locator(".customradio .radiotextsty").last()).toBeChecked()


    await page.locator("#terms").click()
    console.log("terms checked status  :", await page.locator("#terms").isChecked())
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(page.locator("a[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute('class','blinkingText')



 

    await signInBtn.click()

})

test("child window handling", async({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const docLink =page.locator("a[href='https://rahulshettyacademy.com/documents-request']")


   const [newpage] = await Promise.all(
    [context.waitForEvent('page'),
    docLink.click()])

    const text =await newpage.locator(".red").textContent()
    console.log(text)

    const arrayText = text.split("@")
    const domainName = arrayText[1].split(" ")[0]
    await page.bringToFront()
    const userNameField = page.locator("#username")
    await  userNameField.fill(domainName)



    



})



