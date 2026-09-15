import { test, expect } from './fixtures';

test.describe("Authentication flow", () => {
  test("allows admin user to login", async ({ page }) => {
    await page.goto("/login");

    await page.locator('input[type="text"]').fill("admin");
    await page.locator('input[type="password"]').fill("admin123");

    await page.getByRole("button", { name: /login/i }).click();

    await expect(page).toHaveURL("/");
    page.on("dialog", (dialog) => dialog.accept());
    await expect(page.getByTestId("greeting")).toBeVisible();
    await page.getByTestId("greeting").click();
    await expect(page.getByTestId("greeting")).not.toBeVisible();
  });

  test("does not allow non-existent user to login", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="text"]').fill("notarealuser");
    await page.locator('input[type="password"]').fill("notarealpassword");
    await page.getByRole("button", { name: /login/i }).click();
    expect(page).toHaveURL("/");
    expect(page.getByTestId("gretting")).not.toBeVisible();
  });
});
