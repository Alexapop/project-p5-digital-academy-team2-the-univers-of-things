import { test, expect } from '@playwright/test'

test('anime card is visible', async ({ page }) => {
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

    const animeCard = page.locator('.anime-card').first()
    await expect(animeCard).toBeVisible({ timeout: 10000 })
})

test('anime card shows anime poster image', async ({ page }) => {
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

    const imagen = page.locator('.anime-card .card-img-top').first()
    await expect(imagen).toBeVisible({ timeout: 10000 })
    await expect(imagen).toHaveAttribute('alt', 'Anime Poster')
})

test('anime card shows title', async ({ page }) => {
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

    const titulo = page.locator('.anime-card .card-title').first()
    await expect(titulo).toBeVisible({ timeout: 10000 })
    await expect(titulo).toContainText('Naruto')
})

test('anime card shows score', async ({ page }) => {
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

    const score = page.locator('.anime-card .card-score').first()
    await expect(score).toBeVisible({ timeout: 10000 })
    await expect(score).toContainText('⭐')
})

test('anime card shows synopsis', async ({ page }) => {
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

    const sinopsis = page.locator('.anime-card .card-text').first()
    await expect(sinopsis).toBeVisible({ timeout: 10000 })
})

test('anime card has "See more" button', async ({ page }) => {
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

    const botonSeeMore = page.locator('.anime-card .btn-primary').first()
    await expect(botonSeeMore).toBeVisible({ timeout: 10000 })
    await expect(botonSeeMore).toContainText('See more')
})

test('"See more" button navigates to anime detail', async ({ page }) => {
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

    const botonSeeMore = page.locator('.anime-card .btn-primary').first()
    await expect(botonSeeMore).toBeVisible({ timeout: 10000 })
    await botonSeeMore.click()

    // Usar hash routing
    await expect(page).toHaveURL(/\/anime\/1/)
})

test('anime card has favorite button', async ({ page }) => {
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

    const botonFavorito = page.locator('.anime-card .btn-secondary').first()
    await expect(botonFavorito).toBeVisible({ timeout: 10000 })
})

test('favorite button shows heart icon', async ({ page }) => {
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

    const iconoCorazon = page.locator('.anime-card .bi-heart').first()
    await expect(iconoCorazon).toBeVisible({ timeout: 10000 })
})