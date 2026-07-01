import { test, expect } from '@playwright/test'

test('favorite button is visible', async ({ page }) => {
    await page.route('**/api.jikan.moe/v4/anime**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        mal_id: 1,
                        title: 'Naruto',
                        score: 8.5,
                        synopsis: 'Un ninja adolescente...',
                        images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                        genres: [{ name: 'Action' }]
                    }
                ],
                pagination: { last_visible_page: 1 }
            })
        })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButton = page.locator('.anime-card .btn-secondary').first()
    await expect(favoriteButton).toBeVisible({ timeout: 10000 })
})

test('favorite button shows "Añadir a favoritos" title by default', async ({ page }) => {
    await page.route('**/api.jikan.moe/v4/anime**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        mal_id: 1,
                        title: 'Naruto',
                        score: 8.5,
                        synopsis: 'Un ninja adolescente...',
                        images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                        genres: [{ name: 'Action' }]
                    }
                ],
                pagination: { last_visible_page: 1 }
            })
        })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButton = page.locator('.anime-card .btn-secondary').first()
    await expect(favoriteButton).toHaveAttribute('title', 'Añadir a favoritos')
})

test('favorite button shows empty heart by default', async ({ page }) => {
    await page.route('**/api.jikan.moe/v4/anime**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        mal_id: 1,
                        title: 'Naruto',
                        score: 8.5,
                        synopsis: 'Un ninja adolescente...',
                        images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                        genres: [{ name: 'Action' }]
                    }
                ],
                pagination: { last_visible_page: 1 }
            })
        })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const heartIcon = page.locator('.anime-card .bi-heart').first()
    await expect(heartIcon).toHaveAttribute('fill', 'currentColor')
})

test('favorite button asks for login when user is not authenticated', async ({ page }) => {
    await page.route('**/api.jikan.moe/v4/anime**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        mal_id: 1,
                        title: 'Naruto',
                        score: 8.5,
                        synopsis: 'Un ninja adolescente...',
                        images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                        genres: [{ name: 'Action' }]
                    }
                ],
                pagination: { last_visible_page: 1 }
            })
        })
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButton = page.locator('.anime-card .btn-secondary').first()
    await expect(favoriteButton).toBeVisible({ timeout: 10000 })

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Inicia sesión para añadir favoritos')
        await dialog.accept()
    })

    await favoriteButton.click()
})