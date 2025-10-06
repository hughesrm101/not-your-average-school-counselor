import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Not Your Average School Counselor/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('[data-testid="hero"]')).toBeVisible()
    await expect(page.locator('h1')).toContainText(/Not Your Average School Counselor/)
  })

  test('should display feature cards', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('[data-testid="feature-cards"]')).toBeVisible()
    const featureCards = page.locator('[data-testid="feature-card"]')
    await expect(featureCards).toHaveCount(3)
  })

  test('should display newsletter signup', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('[data-testid="newsletter-form"]')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should display navigation', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('a[href="/blog"]')).toBeVisible()
    await expect(page.locator('a[href="/shop"]')).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('a[href="/legal/privacy"]')).toBeVisible()
    await expect(page.locator('a[href="/legal/terms"]')).toBeVisible()
  })
})
