import { test, expect } from '@playwright/test';

test.describe('Test E2E - Componente Hero de Andrea', () => {
  
  test('Debería cargar la página principal y mostrar la sección Hero con su título', async ({ page }) => {
    // 1. Entramos a la raíz de la aplicación
    await page.goto('/');

    // 2. Buscamos el h1 del Hero utilizando el texto real que ya conocemos
    const tituloHero = page.locator('h1');
    
    // 3. Verificamos que el título esté visible en la pantalla
    await expect(tituloHero).toBeVisible();

    // 4. Comprobamos que contiene el texto de tu universo anime
    await expect(tituloHero).toHaveText(/.*universo anime.*/);
  });
});