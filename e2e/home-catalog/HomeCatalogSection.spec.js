import { test, expect } from '@playwright/test'

const mockAnimes = [
    {
        mal_id: 1,
        title: 'Naruto',
        score: 8.5,
        synopsis: 'Ninja anime',
        images: {
            jpg: {
                image_url: 'https://placehold.co/260x400?text=Naruto'
            }
        },
        genres: [{ name: 'Action' }],
        explicit_genres: [],
        themes: [],
        demographics: []
    },
    {
        mal_id: 2,
        title: 'One Piece',
        score: 9,
        synopsis: 'Pirate anime',
        images: {
            jpg: {
                image_url: 'https://placehold.co/260x400?text=One+Piece'
            }
        },
        genres: [{ name: 'Comedy' }],
        explicit_genres: [],
        themes: [],
        demographics: []
    }
]

const mockAnimeApi = async (page) => {
    await page.route('https://api.jikan.moe/v4/anime**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: mockAnimes,
                pagination: {
                    last_visible_page: 1
                }
            })
        })
    })
}

test('home catalog section is visible with title and filters', async ({ page }) => {
    await mockAnimeApi(page)
    await page.goto('/')

    const homeCatalog = page.locator('.home-catalog')

    await expect(homeCatalog).toBeVisible()
    await expect(homeCatalog.getByRole('heading', { name: /General/ })).toBeVisible()
    await expect(page.getByPlaceholder('Buscar anime...')).toBeVisible()
    await expect(homeCatalog.locator('select')).toBeVisible()
})

test('home catalog shows anime cards from the api', async ({ page }) => {
    await mockAnimeApi(page)
    await page.goto('/')

    await expect(page.locator('.home-catalog .anime-card')).toHaveCount(2)
    await expect(page.locator('.home-catalog .card-title', { hasText: 'Naruto' })).toBeVisible()
    await expect(page.locator('.home-catalog .card-title', { hasText: 'One Piece' })).toBeVisible()
})

test('home catalog filters anime cards by search text', async ({ page }) => {
    await mockAnimeApi(page)
    await page.goto('/')

    await page.getByPlaceholder('Buscar anime...').fill('Naruto')

    await expect(page.locator('.home-catalog .card-title', { hasText: 'Naruto' })).toBeVisible()
    await expect(page.locator('.home-catalog .card-title', { hasText: 'One Piece' })).toBeHidden()
})

test('home catalog filters anime cards by genre', async ({ page }) => {
    await mockAnimeApi(page)
    await page.goto('/')

    await page.locator('.home-catalog select').selectOption('Comedy')

    await expect(page.locator('.home-catalog .card-title', { hasText: 'One Piece' })).toBeVisible()
    await expect(page.locator('.home-catalog .card-title', { hasText: 'Naruto' })).toBeHidden()
})

test('home catalog shows no results message when filters do not match', async ({ page }) => {
    await mockAnimeApi(page)
    await page.goto('/')

    await page.getByPlaceholder('Buscar anime...').fill('Bleach')

    await expect(page.getByText('No tenemos anime disponible con estos filtros.')).toBeVisible()
})
