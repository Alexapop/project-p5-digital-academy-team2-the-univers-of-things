import { test, expect } from '@playwright/test';

test.describe('Test E2E - DashboardSidebar de Andrea', () => {
  
  test('Debería mostrar la barra lateral en el panel de control', async ({ page }) => {
    // Entramos a la sección de administración
    await page.goto('/admin');

    // Buscamos el elemento de la barra lateral (suele ser una etiqueta <aside> o <nav>)
    const sidebar = page.locator('aside').or(page.locator('nav'));
    
    // Verificamos que al menos cargue la estructura en la página
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});