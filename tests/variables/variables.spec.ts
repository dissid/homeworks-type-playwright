import { test, expect } from "@playwright/test";

const baseUrl: string = "https://coffee-cart.app/";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test("placeOrder", async ({ page }) => {
  const espressoItem = page.locator("[data-test='Espresso']");
  const shoppingCart = page.getByRole("link", { name: "Cart page" });
  const checkoutButton = page.locator('[data-test="checkout"]');
  const nameTextBox = page.getByRole("textbox", { name: "Name" });
  const emailTextBox = page.getByRole("textbox", { name: "Email" });
  const submitBtn = page.getByRole("button", { name: "Submit" });
  const successMsg = page.getByRole("button", { name: "Thanks for your purchase" });
  const cartCount = page.getByText("cart (0) ");

  await page.goto(baseUrl);

  await espressoItem.click();
  await shoppingCart.click();
  await checkoutButton.click();

  await nameTextBox.fill("Dmytro");
  await emailTextBox.fill("test@test.com");
  await submitBtn.click();

  await expect(successMsg).toBeVisible();
  await expect(cartCount).toBeVisible();
});

test("updateCart", async ({ page }) => {
  const cafeBreveItem = page.locator('[data-test="Cafe_Breve"]');
  const cafeBrevePrice = page.getByRole("heading", { name: "Cafe Breve" }).locator("small");
  const shoppingCart = page.getByRole("link", { name: "Cart page" });
  const addCafeBreveBtn = page.getByRole("button", { name: "Add one Cafe Breve" });
  const cartTotal = page.getByText("$30.00", { exact: true });

  await cafeBreveItem.click();
  const productPrice = await cafeBrevePrice.innerText();

  await shoppingCart.click();
  await addCafeBreveBtn.click();
  await expect(shoppingCart).toContainText("cart (2)");

  await expect(cartTotal).toBeVisible();
});

test("removeFromCart", async ({ page }) => {
  const flatWhiteItem = page.locator('[data-test="Flat_White"]');
  const americanoItem = page.locator('[data-test="Americano"]');
  const shoppingCart = page.getByRole("link", { name: "Cart page" });
  const removeAmericanoBtn = page.getByRole("button", { name: "Remove one Americano" });
  const removeFlatWhiteBtn = page.getByRole("button", { name: "Remove all Flat White" });
  const emptyCartMsg = page.getByRole("paragraph");

  await flatWhiteItem.click();
  await americanoItem.click();

  await shoppingCart.click();
  await removeAmericanoBtn.click();
  await removeFlatWhiteBtn.click();

  await expect(emptyCartMsg).toContainText("No coffee, go add some.");
});

test("getDiscountedMocha", async ({ page }) => {
  const espressoItem = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoItem = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccinoItem = page.locator('[data-test="Cappuccino"]');
  const promoMsg = page.locator(".promo");
  const acceptDiscountBtn = page.getByRole("button", { name: "Yes, of course!" });
  const shoppingCart = page.getByRole("link", { name: "Cart page" });
  const app = page.locator("#app");

  await espressoItem.click();
  await espressoMacchiatoItem.click();
  await cappuccinoItem.click();

  await expect(promoMsg).toContainText("It's your lucky day! Get an extra cup of Mocha for $4.");
  await acceptDiscountBtn.click();

  await shoppingCart.click();

  await expect(app).toContainText("(Discounted) Mocha");
  await expect(app).toContainText("$4.00");
});

test("declineDiscountedMocha", async ({ page }) => {
  const espressoItem = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoItem = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccinoItem = page.locator('[data-test="Cappuccino"]');
  const declineDiscountBtn = page.getByRole("button", { name: "Nah, I'll skip" });
  const shoppingCart = page.getByRole("link", { name: "Cart page" });
  const app = page.locator("#app");

  await espressoItem.click();
  await espressoMacchiatoItem.click();
  await cappuccinoItem.click();

  await declineDiscountBtn.click();
  await shoppingCart.click();

  await expect(app).not.toContainText("(Discounted) Mocha");
  await expect(app).not.toContainText("$4.00");
});
