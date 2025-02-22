import { test } from "@playwright/test";

test("should sign in and fetch user data", async ({ page }) => {
  await page.goto("/auth/login");

  await page.fill('input[name="email"]', "saraahmad@gmail.com");
  await page.fill('input[name="password"]', "Password@1234");

  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("/api/auth/callback/credentials") &&
        res.status() === 200,
    ),
    page.click('button[type="submit"]'),
  ]);
  console.log("response", await response.json());
});
