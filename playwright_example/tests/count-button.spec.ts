import { test, expect } from '@playwright/test';

test('increment count button', async ({ page }) => {
  await page.goto('https://react-monitoring.vercel.app/');
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await expect(page.getByRole('button')).toContainText('count is 3');
});

test('count button resets on nav', async ({ page }) => {
  await page.goto('https://react-monitoring.vercel.app/');
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('button')).toContainText('count is 0');
});