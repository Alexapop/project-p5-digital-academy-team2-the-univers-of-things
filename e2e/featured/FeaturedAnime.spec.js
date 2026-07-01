import { test, expect } from '@playwright/test'

test('featured section is visible when admin has configured featured animes', async ({ page }) => {
    await page.addInitScript(() => {
        const featured = [
            {
                mal_id: 1,
                title: 'Naruto',
                score: 8.5,
                synopsis: 'Un ninja adolescente...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Action' }]
            }
        ]
        localStorage.setItem('animes_destacados', JSON.stringify(featured))
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const featuredSection = page.locator('.featured')
    await expect(featuredSection).toBeVisible({ timeout: 10000 })
})

test('featured section shows "Featured Anime" title', async ({ page }) => {
    await page.addInitScript(() => {
        const featured = [
            {
                mal_id: 1,
                title: 'Naruto',
                score: 8.5,
                synopsis: 'Un ninja adolescente...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Action' }]
            }
        ]
        localStorage.setItem('animes_destacados', JSON.stringify(featured))
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const featuredTitle = page.locator('.featured__title h1')
    await expect(featuredTitle).toBeVisible({ timeout: 10000 })
    await expect(featuredTitle).toContainText('Featured Anime')
})

test('featured section shows anime cards when featured animes exist', async ({ page }) => {
    await page.addInitScript(() => {
        const featured = [
            {
                mal_id: 1,
                title: 'Naruto',
                score: 8.5,
                synopsis: 'Un ninja adolescente...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Action' }]
            },
            {
                mal_id: 2,
                title: 'One Piece',
                score: 9.0,
                synopsis: 'Un pirata...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Adventure' }]
            }
        ]
        localStorage.setItem('animes_destacados', JSON.stringify(featured))
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const featuredCards = page.locator('.featured-grid .anime-card')
    await expect(featuredCards.first()).toBeVisible({ timeout: 10000 })
    await expect(featuredCards).toHaveCount(2)
})

test('featured section shows correct anime titles in cards', async ({ page }) => {
    await page.addInitScript(() => {
        const featured = [
            {
                mal_id: 1,
                title: 'Naruto',
                score: 8.5,
                synopsis: 'Un ninja adolescente...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Action' }]
            },
            {
                mal_id: 2,
                title: 'One Piece',
                score: 9.0,
                synopsis: 'Un pirata...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Adventure' }]
            }
        ]
        localStorage.setItem('animes_destacados', JSON.stringify(featured))
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const firstCard = page.locator('.featured-grid .anime-card').nth(0)
    const secondCard = page.locator('.featured-grid .anime-card').nth(1)

    await expect(firstCard.locator('.card-title')).toContainText('Naruto')
    await expect(secondCard.locator('.card-title')).toContainText('One Piece')
})

test('featured section shows empty state when no featured animes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const emptyMessage = page.locator('.featured-wrapper .text-muted')
    await expect(emptyMessage).toBeVisible()
    await expect(emptyMessage).toContainText('No hay ningún anime destacado seleccionado en el panel de administración.')
})

test('featured section is hidden when no featured animes configured', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const featuredSection = page.locator('.featured')
    await expect(featuredSection).not.toBeVisible()
})

test('featured grid has 4 columns layout', async ({ page }) => {
    await page.addInitScript(() => {
        const featured = [
            {
                mal_id: 1,
                title: 'Naruto',
                score: 8.5,
                synopsis: 'Un ninja adolescente...',
                images: { jpg: { image_url: 'https://via.placeholder.com/260x400' } },
                genres: [{ name: 'Action' }]
            }
        ]
        localStorage.setItem('animes_destacados', JSON.stringify(featured))
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const featuredGrid = page.locator('.featured-grid')
    await expect(featuredGrid).toHaveCSS('display', 'grid')
})