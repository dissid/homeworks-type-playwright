import type { Page } from "@playwright/test";

export async function open(page: Page) {
  await page.goto("/login");
}

export async function signIn(page: Page, user: { email: string; password: string }) {
  await page.getByTestId("auth-email").fill(user.email);
  await page.getByTestId("auth-password").fill(user.password);
  await page.getByTestId("auth-submit").click();

  await page.waitForURL("http://104.168.59.50/articles");
}
