// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //retries: 2,
  
  timeout: 40 *1000, //Maximum timeout for the testcase to run
  expect:{
    
    timeout: 30 *1000, //This timeout is for expected result
  },

  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure', //on, off
    video: 'retain-on-failure',
    //viewport : {width: 720, height: 720} //This will open in that size browser
    //...devices['']  // This will help in responsive testing to run test on mobile device
  }
},
{
  
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
});

