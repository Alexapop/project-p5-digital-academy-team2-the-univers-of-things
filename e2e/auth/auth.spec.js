import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear()
  })
})

test('customer can log in and access profile dashboard', async ({ page }) => {
    // login test
    await page.goto('/#/login/')
    await expect(page.getByText('Bienvenido de vuelta')).toBeVisible()

    await page.locator('input[type="email"]').fill('user@otakuhub.dev')
    await page.locator('input[type="password"]').fill('user1234')

    await page.locator('input[type="password"]').press('Enter')

    await expect(page).toHaveURL(/\/dashboard\/perfil/)
    await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
})

test('customer can create a new account', async ({ page }) => {
    // register test
    const email = `usuario-${Date.now()}@test.com`

    await page.goto('/#/register/')
    await expect(page.getByRole('heading', { name: 'Crea tu cuenta' })).toBeVisible()

    await page.locator('input#name').fill('Usuario Test')
    await page.locator('input#email').fill(email)
    await page.locator('input#password').fill('123456')
    await page.locator('input#confirm-password').fill('123456')

    await page.locator('input#confirm-password').press('Enter')

    await expect(page).toHaveURL(/\/dashboard\/perfil/)
    await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
})

test('shows error with wrong login credentials', async ({ page }) => {
    await page.goto('/#/login/')
    await expect(page.getByText('Bienvenido de vuelta')).toBeVisible()

    await page.locator('input[type="email"]').fill('wrong@email.com')
    await page.locator('input[type="password"]').fill('wrongpass')

    await page.locator('input[type="password"]').press('Enter')

    await expect(page.getByText('Credenciales incorrectas')).toBeVisible()
    await expect(page).toHaveURL(/\/login/)
})

test('shows error when registering with an existing email', async ({ page }) => {
    await page.goto('/#/register/')
    await expect(page.getByRole('heading', { name: 'Crea tu cuenta' })).toBeVisible()

    await page.locator('input#name').fill('Usuario Test')
    await page.locator('input#email').fill('user@otakuhub.dev')
    await page.locator('input#password').fill('123456')
    await page.locator('input#confirm-password').fill('123456')

    await page.locator('input#confirm-password').press('Enter')

    await expect(page.getByText('Este correo ya está registrado')).toBeVisible()
    await expect(page).toHaveURL(/\/register/)
})

test('admin can log in and access users admin page', async ({ page }) => {
    await page.goto('/#/login/')
    await expect(page.getByText('Bienvenido de vuelta')).toBeVisible()

    await page.locator('input[type="email"]').fill('admin@otakuhub.dev')
    await page.locator('input[type="password"]').fill('admin123')

    await page.locator('input[type="password"]').press('Enter')

    await expect(page).toHaveURL(/\/admin\/usuarios/)
    await expect(page.getByRole('heading', { name: 'Usuarios' })).toBeVisible()
})
