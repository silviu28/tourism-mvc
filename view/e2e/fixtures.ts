import { test as base, expect } from '@playwright/test';

export const test = base.extend<{ resetDbAndCookies: void }>({
  resetDbAndCookies: [
    async ({ request, context }, use) => {
      const response = await request.post('http://localhost:4004/api/test/reset');
      if (!response.ok()) {
        throw new Error(`Failed to reset test DB: ${response.status()} ${await response.text()}`);
      }

      await context.clearCookies();

      await use();
    },
    { auto: true },
  ],
});

export { expect };
