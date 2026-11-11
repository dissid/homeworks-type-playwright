import { expect, test } from "@playwright/test";

const arrayFormData = [
  {
    id: "all fields",
    name: "Vasyl",
    email: "Vasyl@example.com",
    epic: "Повідомити про ваду",
    priority: "high",
    file: "tests/resources/image.png",
    message: "lorem text",
    copy: "yes",
    result: "Дякуємо!",
  },
  {
    id: "required fields",
    name: "Zina",
    email: "zina@example.com",
    epic: "Загальне питання",
    priority: "medium",
    message: "test message",
    file: "",
    copy: "no",
    result: "Дякуємо!",
  },
  {
    id: "not required fields",
    name: "",
    email: "",
    epic: "Загальне питання",
    priority: "low",
    message: "",
    file: "tests/resources/image.png",
    copy: "no",
    result: "name обов'язкове полеemail некоректний emailmessage обов'язкове поле",
  },
];

test.beforeEach(async ({ page }) => {
  page.goto("http://104.168.59.50/articles/contact");
});
for (const data of arrayFormData) {
  test("Fill " + data.id, async ({ page }) => {
    await page.getByTestId("contact-name").fill(data.name);
    await page.getByTestId("contact-email").fill(data.email);
    await page.getByTestId("contact-subject").selectOption(data.epic);
    await page.getByTestId("contact-priority-" + data.priority).check();
    await page.getByTestId("contact-message").fill(data.message);
    if (data.file) {
      await page.getByTestId("contact-attachments").setInputFiles(data.file);
    }
    if (data.copy === "yes") {
      await page.getByText("Надіслати копію звернення мені на email").click();
    }
    await page.getByTestId("contact-copy-me").check();
    await page.getByTestId("contact-submit").click();
    if (data.result === "Дякуємо!") {
      await expect(page.getByRole("heading")).toContainText(data.result);
    } else {
      await expect(page.getByTestId("error-messages")).toContainText(data.result);
    }
  });
}
