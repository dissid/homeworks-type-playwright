import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import * as loginPage from "./pages/LoginPage";
import { createTenArticles } from "./pages/NewArticlePage";
import * as accountPage from "./pages/AccountPage";

const User = {
  email: "totaja2447@ensproxy.com",
  password: "password",
};

const newArticleData = {
  title: faker.lorem.word(),
  description: faker.lorem.sentence(10),
  body: faker.lorem.text(),
  tags: faker.lorem.words(3),
  category: ["General", "Automation", "Tools", "Career", "News"],
};

test("Creation 10 articles and check Your feed", async ({ page }) => {
  await loginPage.open(page);
  await loginPage.signIn(page, User);

  const titles = await createTenArticles(page, newArticleData);

  await accountPage.open(page);
  await expect(page.getByTestId("preview-title").filter({ hasText: newArticleData.title })).toHaveText(titles);
});
