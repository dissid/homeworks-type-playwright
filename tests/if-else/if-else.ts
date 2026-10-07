import { expect, test } from "@playwright/test";

function getVotingMessage(age: number) {
  if (age <= 17) {
    return "Ви ще не можете голосувати.";
  } else {
    return "Ви можете голосувати.";
  }
}

test("Ви НE можете голосувати", () => {
  expect(getVotingMessage(17)).toBe("Ви ще не можете голосувати.");
});

test("Ви можете голосувати", () => {
  expect(getVotingMessage(18)).toBe("Ви можете голосувати.");
});

test("Ви можете голосувати після 18 роківв", () => {
  expect(getVotingMessage(19)).toBe("Ви можете голосувати.");
});
