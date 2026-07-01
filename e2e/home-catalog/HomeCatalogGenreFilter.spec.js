import { test, expect } from '@playwright/test'

test('genre filter is visible', async ({ page }) => {
    await page.goto('/')

    const genreFilter = page.locator('.home-catalog__filters select')

    await expect(genreFilter).toBeVisible()
})

test('genre filter shows genre options', async ({ page }) => {
    await page.goto('/')

    const genreFilter = page.locator('.home-catalog__filters select')
    const options = genreFilter.locator('option')

    await expect(options).toHaveCount(20)
    await expect(options.nth(0)).toHaveAttribute('value', '')
    await expect(options.nth(1)).toHaveAttribute('value', 'Action')
    await expect(options.nth(2)).toHaveAttribute('value', 'Adventure')
})

test('genre filter selects all genres by default', async ({ page }) => {
    await page.goto('/')

    const genreFilter = page.locator('.home-catalog__filters select')

    await expect(genreFilter).toHaveValue('')
})

test('user can select a genre', async ({ page }) => {
    await page.goto('/')

    const genreFilter = page.locator('.home-catalog__filters select')

    await genreFilter.selectOption('Comedy')

    await expect(genreFilter).toHaveValue('Comedy')
})

test('user can reset the genre filter', async ({ page }) => {
    await page.goto('/')

    const genreFilter = page.locator('.home-catalog__filters select')

    await genreFilter.selectOption('Horror')
    await expect(genreFilter).toHaveValue('Horror')

    await genreFilter.selectOption('')
    await expect(genreFilter).toHaveValue('')
})
