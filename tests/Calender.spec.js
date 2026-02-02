// // 

// const {test,expect} = require("@playwright/test");
 
 
// test("Calendar validations",async({page})=>
// {
 
    
//     const date = "15";
//     const monthNumber = "6";
//     const year = "2027";
//     const expectedList = [monthNumber,date,year];
//     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//     await page.locator(".react-date-picker__inputGroup").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.getByText(year).click();
//     await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
//     await page.locator("//abbr[text()='"+date+"']").click();
//     const inputs = await page.locator(".react-date-picker__inputGroup input")
    
  
//     const inputCount =await inputs.count();
//     console.log("inputCount : ",inputCount)

//     for (let index = 1; index < inputCount; index++)
//     {

//         const value = await inputs.nth(index).getAttribute("value");

//         console.log("value : ",value)
//         console.log("expectedList : ",expectedList[index-1])
//         expect(value).toEqual(expectedList[index-1]);
//     }
 
 
 
// })

const { test, expect } = require("@playwright/test");

test("Dynamic calendar selection", async ({ page }) => {
  // Dynamic test data
  const targetDay = "2";
  const targetMonth = 6; // June (1-based)
  const targetYear = 2027;

  const expectedList = [targetMonth.toString(), targetDay, targetYear.toString()];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  // Open the calendar widget
  await page.locator(".react-date-picker__calendar-button").click();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const targetMonthName = monthNames[targetMonth - 1];
  const expectedLabel = `${targetMonthName} ${targetYear}`;

  // Navigate until correct month & year is visible
  while (true) {
    const label = await page.locator(".react-calendar__navigation__label__labelText").textContent();
    if (label?.trim() === expectedLabel) break;

    const [labelMonthStr, labelYearStr] = label.trim().split(" ");
    const labelMonthIndex = monthNames.indexOf(labelMonthStr);
    const labelYear = parseInt(labelYearStr);

    if (labelYear > targetYear || (labelYear === targetYear && labelMonthIndex > targetMonth - 1)) {
      await page.locator(".react-calendar__navigation__prev-button").click();
    } else {
      await page.locator(".react-calendar__navigation__next-button").click();
    }
  }

  // Construct exact aria-label for date selection
  const ariaLabel = `${targetMonthName} ${targetDay}, ${targetYear}`;
  await page.locator(`.react-calendar__tile abbr[aria-label="${ariaLabel}"]`).click();

  // Verify selected inputs: [month, day, year]
  const inputs = page.locator(".react-date-picker__inputGroup input:not([hidden])");
  for (let index = 0; index < expectedList.length; index++) {
    const value = await inputs.nth(index).inputValue();
    expect(value).toBe(expectedList[index]);
  }
});
