import { test, expect } from '@playwright/test';

test.describe.skip('Users flows', () => {
  test('displays the users list when navigating to the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Loading users/i)).toBeVisible();
  });
});
