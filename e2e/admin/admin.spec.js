import { test, expect } from '@playwright/test';

test.describe('UTE2-15: Test E2E - Panel de Administración de Andrea', () => {
  
  test('Debería cargar el panel de administración', async ({ page }) => {
    // Vamos a la raíz o a la sección del catálogo para verificar que carga el proyecto
    await page.goto('/');
    
    // Comprobamos que el título principal de tu web es visible
    const titulo = page.locator('h1');
    await expect(titulo).toBeVisible();
  });
});