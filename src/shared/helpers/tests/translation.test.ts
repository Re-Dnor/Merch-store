import { translation } from "../translation";

describe("Translation", () => {
  test("The word is on the list", () => {
    const white = translation("white");
    const black = translation("black");
    const red = translation("red");
    const green = translation("green");
    const gray = translation("gray");

    expect(white).toBe("Белый");
    expect(black).toBe("Черный");
    expect(red).toBe("Красный");
    expect(green).toBe("Зеленый");
    expect(gray).toBe("Серый");
  });
  test("The word is not on the list", () => {
    const text = translation("orange");

    expect(text).toBe("orange");
  });
});
