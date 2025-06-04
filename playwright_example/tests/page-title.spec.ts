import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('https://react-monitoring.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React Demo by Nica/);
});

test('contact link', async ({ page }) => {
  await page.goto('https://react-monitoring.vercel.app/');

  // Click the get contact link.
  await page.getByRole('link', { name: 'Contact' }).click();

  // Expects page to have a heading with the name of Contact.
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
});
