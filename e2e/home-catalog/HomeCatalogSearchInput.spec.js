import { test, expect } from '@playwright/test'

test('search input is visible', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByPlaceholder('Buscar anime...')).toBeVisible()
})

test('user can write in the search input', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.getByPlaceholder('Buscar anime...')

    await searchInput.fill('Naruto')

    await expect(searchInput).toHaveValue('Naruto')
})

test('search input shows an error with invalid characters', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.getByPlaceholder('Buscar anime...')

    await searchInput.fill('123')

    await expect(page.getByText('Por favor, introduce solo letras.')).toBeVisible()
})

test('search input hides the error when the text is valid', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.getByPlaceholder('Buscar anime...')
    const searchError = page.getByText('Por favor, introduce solo letras.')

    await searchInput.fill('123')
    await expect(searchError).toBeVisible()

    await searchInput.fill('Naruto')
    await expect(searchError).toBeHidden()
})
