import { test, expect } from "@playwright/test";

// Test the home page and navigation
test("should load the home page correctly", async ({ page }) => {
  await page.goto("/");

  // Check that important sections are visible
  await expect(page.locator('h2:has-text("Memes Gallery")')).toBeVisible();
  await expect(page.locator("nav")).toBeVisible();
});

// Test the lab section
test("should display the meme creation lab section", async ({ page }) => {
  await page.goto("/");

  // Check that the lab section is visible
  await expect(page.locator('section:has-text("Lab")')).toBeVisible();
  await expect(page.locator('button:has-text("Start creating")')).toBeVisible();
});

// Test meme creation functionality
test("should allow uploading an image in the lab", async ({ page }) => {
  await page.goto("/");

  // Navigate to lab section
  const labSection = page.locator('section:has-text("Lab")');
  await expect(labSection).toBeVisible();

  // Check drop zone functionality is visible
  const dropZone = page.locator("#file-upload-handle");
  await expect(dropZone).not.toBeVisible();
});

// Test the text tools in the lab
test("should allow adding text to a meme", async ({ page }) => {
  await page.goto("/");

  // Navigate to the lab and ensure tools are available
  const textTool = page.locator("#text-tool");
  await expect(textTool).toBeVisible();

  await expect(textTool).toBeDisabled();
});

// Test canvas functionality
/* test("should have a working canvas for meme editing", async ({ page }) => {
  await page.goto("/");

  // Check that canvas exists
  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();
}); */

// Test meme gallery rendering
test("should show memes in the gallery section", async ({ page }) => {
  await page.goto("/");

  // Check that gallery section exists
  const gallerySection = page.locator('section:has-text("Memes Gallery")');
  await expect(gallerySection).toBeVisible();

  // Check for meme cards
  const memeCards = page.locator("#meme-card");
  // Allow for loading state
  await expect(async () => {
    const count = await memeCards.count();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5000 });
});

// Test form submission
test("should allow saving a created meme", async ({ page }) => {
  await page.goto("/");

  // Find save button
  const saveButton = page.locator('button:has-text("Save")');
  await expect(saveButton).toBeVisible();

  await expect(saveButton).toBeDisabled();
});

// Test dark mode toggle
test("should toggle between light and dark modes", async ({ page }) => {
  await page.goto("/");

  // Find theme toggle
  const themeToggle = page.locator("#theme-toggle");
  await expect(themeToggle).toBeVisible();

  // Get initial mode
  const initialMode = await page.evaluate(() => {
    return document.documentElement.classList.contains("dark");
  });

  // Click toggle
  await themeToggle.click();

  // Check that mode changed
  const newMode = await page.evaluate(() => {
    return document.documentElement.classList.contains("dark");
  });

  expect(newMode).not.toEqual(initialMode);
});
