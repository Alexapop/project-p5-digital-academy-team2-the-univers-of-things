import { test, expect } from '@playwright/test';





test('visits the app root url', async ({ page }) => {


  await page.goto('/');
  // Busca el h1 usando parte del texto real sin importar los espacios exactos
  await expect(page.locator('h1')).toHaveText(/.*universo anime.*/);
});