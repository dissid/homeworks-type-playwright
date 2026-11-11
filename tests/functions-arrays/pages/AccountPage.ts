import { expect, type Page } from "@playwright/test";

export async function open(page: Page) {
  await page.getByTestId("nav-profile").click();

  await expect(page.getByTestId("profile-tab-my")).toBeVisible();
}

export async function getArticles(page: Page) {
  return await page.getByTestId("preview-title").allTextContents();
}
