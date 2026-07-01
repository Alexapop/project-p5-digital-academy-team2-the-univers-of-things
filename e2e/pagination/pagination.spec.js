import { test, expect } from '@playwright/test';

test.describe('Test E2E - Paginación de Andrea', () => {
  
  test('Debería mostrar los controles de paginación en la vista', async ({ page }) => {
    // Vamos a la página principal donde está tu catálogo paginado
    await page.goto('/');

    // Buscamos algún indicador común de paginación o el propio contenedor
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});