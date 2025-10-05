import { test, expect } from '@playwright/test'

test.describe('Shop', () => {
  test('should load shop page', async ({ page }) => {
    await page.goto('/shop')
    
    await expect(page).toHaveTitle(/Shop/)
    await expect(page.locator('h1')).toContainText('Shop')
  })

  test('should display product grid', async ({ page }) => {
    await page.goto('/shop')
    
    await expect(page.locator('[data-testid="product-grid"]')).toBeVisible()
  })

  test('should display filters', async ({ page }) => {
    await page.goto('/shop')
    
    await expect(page.locator('[data-testid="shop-filters"]')).toBeVisible()
  })

  test('should allow filtering by category', async ({ page }) => {
    await page.goto('/shop')
    
    const categoryFilter = page.locator('[data-testid="category-filter"]')
    await expect(categoryFilter).toBeVisible()
    
    await categoryFilter.click()
    await expect(page.locator('[data-testid="filter-options"]')).toBeVisible()
  })

  test('should display product details on click', async ({ page }) => {
    await page.goto('/shop')
    
    const productCard = page.locator('[data-testid="product-card"]').first()
    await expect(productCard).toBeVisible()
    
    await productCard.click()
    await expect(page).toHaveURL(/.*\/shop\/.*/)
  })
})
