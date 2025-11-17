
import {test, expect} from '@playwright/test'
import { connected } from 'process'

    test("more validation testing", async ({page})=>{

       await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
       await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()

       await page.locator("#hide-textbox").click()

       await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()

      

        page.on('dialog',async dialog =>{

             console.log("confirmation messgae : ", dialog.message())
             console.log("alert type : ", dialog.type())
            await dialog.accept()


             

        })
         await page.getByPlaceholder("Enter Your Name").fill("jasdeep")
         await page.locator('#alertbtn').click()
         
         await page.getByPlaceholder("Enter Your Name").fill("jasdeep")

         await page.locator('#confirmbtn').click()


         const frame = page.frameLocator("#courses-iframe")
        await frame.getByRole('link',{name:'Courses'}).click()
        await frame.getByRole('link',{name:'More '}).hover()
        await page.pause()

    

       

       })


  
