import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login')
    
    await expect(page).toHaveTitle(/Login/)
    await expect(page.locator('h1')).toContainText('Sign in')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should display register page', async ({ page }) => {
    await page.goto('/auth/register')
    
    await expect(page).toHaveTitle(/Register/)
    await expect(page.locator('h1')).toContainText('Create account')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should redirect to login when accessing protected route', async ({ page }) => {
    await page.goto('/account')
    
    await expect(page).toHaveURL(/.*auth\/login/)
  })

  test('should redirect to login when accessing admin route', async ({ page }) => {
    await page.goto('/admin')
    
    await expect(page).toHaveURL(/.*auth\/login/)
  })
})
