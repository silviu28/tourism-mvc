import { test, expect } from '@playwright/test';

test("opens", async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/MyTravel/);
});

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Sign Up", path: "/signup" },
  { name: "Login", path: "/login" },
  { name: "Wiki", path: "/wiki" },
  { name: "Prices", path: "/prices" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
];

test.describe("navbar navigation", () => {
  for (const { name, path } of navLinks) {
    test(`clicking "${name}" navigates to ${path}`, async ({ page }) => {
      await page.goto("http://localhost:5173");

      const link = page.getByRole("link", { name });
      await expect(link).toBeVisible();

      await link.click();
      await expect(page).toHaveURL(`http://localhost:5173${path}`);
    });
  }
});
 