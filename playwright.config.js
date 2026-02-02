// @ts-check
import { chromium, defineConfig, devices, firefox } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect:
  {
    timeout: 6000
  },
 reporter: [
    ['html'],
    ['allure-playwright']
  ],

  use:
  {
    screenshot: 'on',
    headless: false,
    trace:'on',
    video: 'on',
    
  }
  ,
  workers: 2,

  projects: [
    {
      name: 'chrome',
      use: {
        // Do not spread the device descriptor if you want viewport: null
        // ...devices['Desktop Chrome'],
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'on',
        launchOptions: {
          args: ['--start-maximized']
        },
        viewport: null // This is now valid because device descriptor is not spread
      },
    }
    //     ,
    // {
    //   name:"Mobile Chrome",
    //   use:{...devices["Pixel 7"]}
    // }
  ]





});

