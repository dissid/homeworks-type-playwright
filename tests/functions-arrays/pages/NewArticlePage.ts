import { expect, type Page } from "@playwright/test";

export type ArticleData = {
  title: string;
  description: string;
  body: string;
  tags: string;
  category: string[];
};

export async function open(page: Page) {
  await page.getByTestId("nav-new-article").click();
}

export async function createTenArticles(page: Page, newArticleData: ArticleData) {
  const titles: string[] = [];

  for (let i = 0; i < 10; i++) {
    await open(page);
    titles.push(newArticleData.title);
    await fillNewArticleForm(page, newArticleData);
  }

  return titles;
}

export async function fillNewArticleForm(page: Page, newArticleData: ArticleData) {
  await page.getByTestId("editor-title").fill(newArticleData.title);
  await page.getByTestId("editor-description").fill(newArticleData.description);
  await page.getByTestId("editor-body").fill(newArticleData.body);
  await page.getByTestId("editor-tags").fill(newArticleData.tags);
  await page
    .getByTestId("editor-category")
    .selectOption(newArticleData.category[Math.floor(Math.random() * newArticleData.category.length)]);

  await page.getByTestId("editor-submit").click();
  await expect(page.getByTestId("article-title")).toHaveText(newArticleData.title);
}
