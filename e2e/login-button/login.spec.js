import { test, expect } from '@playwright/test';

test.describe('Test E2E - Flujo de Login de Andrea', () => {
  
  test('Debería cargar la página de inicio de sesión correctamente', async ({ page }) => {
    // Vamos directo a la URL de login
    await page.goto('/login');

    // Verificamos que la URL contiene 'login'
    await expect(page).toHaveURL(/.*login.*/);

    // Comprobamos que carga la página
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});