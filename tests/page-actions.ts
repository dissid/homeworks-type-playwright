import type { Page } from "@playwright/test";

export async function fillPaymentForm(page: Page) {
  await page.locator("#name").fill("Dmytro");
  await page.locator("#email").fill("test@test.com");
  await page.locator("#submit-payment").click();
}

export async function addThreeCoffeeDrinks(page: Page) {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
}
