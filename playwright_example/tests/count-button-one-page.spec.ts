import { test, expect, type Page } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('increment count button', async () => {
  await page.goto('https://react-monitoring.vercel.app/');
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await expect(page.getByRole('button')).toContainText('count is 3');
});

test('count button resets on nav', async () => {
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('button', { name: 'count is' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.getByRole('button')).toContainText('count is 0');
});

