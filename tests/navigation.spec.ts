import { test, expect } from "@playwright/test";

// Test navigation functionality
test("should navigate between pages correctly", async ({ page }) => {
  await page.goto("/");

  // Assuming there's a navigation to a gallery or detail page
  const galleryLink = page.locator('a:has-text("Galerie")');

  // If it exists, test navigation
  if ((await galleryLink.count()) > 0) {
    await galleryLink.click();
    // Check URL changed
    await expect(page).toHaveURL(/.*galerie.*/);

    // Back to home
    await page.goto("/");
    await expect(page).toHaveURL("/");
  }
});

// Test that 404 page works correctly
test("should show 404 page for non-existent routes", async ({ page }) => {
  // Go to a page that doesn't exist
  await page.goto("/page-qui-nexiste-pas");

  // Check that 404 content is shown
  await expect(page.locator("text=404")).toBeVisible();
  await expect(
    page.locator("text=The page you are looking for is not available!")
  ).toBeVisible();

  // Check there's a way back to home page
  const homeLink = page.locator('a:has-text("Go to Home")');
  await expect(homeLink).toBeVisible();
});
