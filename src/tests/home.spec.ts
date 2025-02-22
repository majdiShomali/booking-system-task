import { test, expect } from '@playwright/test';

test('homepage test', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.locator('h1')).toContainText('Welcome to Booking System');
});