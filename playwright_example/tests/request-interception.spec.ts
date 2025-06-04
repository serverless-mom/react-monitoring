import { test, expect } from '@playwright/test'

test('intercept response', async ({ page }) => {
    const mockResponseObject = 
        {
            "utc_offset": "+00:00",
            "timezone": "Etc/UTC",
            "day_of_week": 3,
            "day_of_year": 155,
            "datetime": "2025-06-04T02:02:17.954726+00:00",
            "utc_datetime": "2025-06-04T02:02:17.954726+00:00",
            "unixtime": 1749002537,
            "raw_offset": 0,
            "week_number": 23,
            "dst": false,
            "abbreviation": "UTC",
            "dst_offset": 0,
            "dst_from": null,
            "dst_until": null,
            "client_ip": "97.115.64.95"
        }
    

    await page.route('https://worldtimeapi.org/api/timezone/Etc/UTC', (route) =>
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockResponseObject)
        })
    )

  await page.goto('https://react-monitoring.vercel.app/');
  await page.getByRole('link', { name: 'Current Time' }).click();
  await expect(page.locator('#root')).toContainText('6/3/2025, 7:02:17 PM');
})