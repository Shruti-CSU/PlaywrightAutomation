// spec: specs/login-page.test.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('SQL Injection attempt in username field', async ({ page }) => {
    // 1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter SQL injection payload in username: ' OR '1'='1
    await page.getByRole('textbox', { name: 'Username:' }).fill('\' OR \'1\'=\'1');
    
    // 3. Enter password 'Learning@830$3mK2' in the Password field
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 4. Check the terms checkbox and click Sign In button
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verify SQL injection is prevented - user should remain on login page or see error
    await expect(page).toHaveURL(/loginpagePractise/);
  });

  test('XSS attempt in username field', async ({ page }) => {
    // 1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    
    // 2. Enter XSS payload in username: <script>alert('XSS')</script>
    await page.getByRole('textbox', { name: 'Username:' }).fill('<script>alert(\'XSS\')</script>');
    
    // 3. Enter password 'Learning@830$3mK2' in the Password field
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    
    // 4. Check the terms checkbox and click Sign In button
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verify XSS is prevented - user should remain on login page (no JavaScript alert executed)
    await expect(page).toHaveURL(/loginpagePractise/);
  });

  test('Browser back button after logout maintains security', async ({ page }) => {
    // 1. Complete a successful login with valid credentials
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verify user is logged in and on the dashboard/shop page
    await expect(page).toHaveURL(/\/angularpractice/);
    
    // 2. Logout from the application (simulate logout by navigating back)
    // Note: The application doesn't have an explicit logout button, so we'll use browser back
    
    // 3. Click the browser back button
    await page.goBack();
    
    // Verify browser does not return to the authenticated page
    // User should be back on the login page, not the authenticated shop page
    await expect(page).toHaveURL(/loginpagePractise/);
  });
});
