import { test, expect } from '@playwright/test';

test('image does not load', async ({ page }) => {
  await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'

      ? route.abort()

      : route.continue()

  })
  await page.goto('https://react-monitoring.vercel.app/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('paragraph')).toContainText('This is a simple multi-page React application.');
});