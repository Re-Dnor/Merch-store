import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../index";

describe("Home page markup", () => {
  test("Find A-store and menu", async () => {
    await act(() => render(<App />));

    const aStore = screen.getByText("A-Store");
    const menu = screen.getByText("Меню");
    expect(aStore).toBeInTheDocument();
    expect(menu).toBeInTheDocument();
  });

  test("Open the sidebar", async () => {
    render(<App />);

    const menu = screen.getByText("Меню");
    await userEvent.click(menu);

    const closeMenuBtn = screen.getByTestId("header-side-panel");
    expect(closeMenuBtn).toBeInTheDocument();
  });
});

describe("Transition to other pages", () => {
  test("Switch to the made in Alfa page", async () => {
    await act(() => render(<App />));

    const madeInAlfa = screen.getByText("Сделано в Альфе");
    await userEvent.click(madeInAlfa);
    const text = await screen.findByText(
      "Хотим каждую из этих вещей! Себе, родным и друзьям"
    );
    expect(text).toBeInTheDocument();

    const homePageBtn = screen.getByText("A-Store");
    await userEvent.click(homePageBtn);
    expect(screen.getByText("Свой дизайн")).toBeVisible();
  });

  test("Switch to the your design", async () => {
    await act(() => render(<App />));

    const yourDesign = screen.getByText("Свой дизайн");
    await userEvent.click(yourDesign);

    expect(
      await screen.findByText(
        "Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер на вещь как на фото"
      )
    ).toBeVisible();

    const homePageBtn = await screen.findByText("A-Store");
    await userEvent.click(homePageBtn);
    expect(await screen.findByText("Сделано в Альфе")).toBeVisible();
  });

  test("Switch to the contacs", async () => {
    await act(() => render(<App />));

    const menu = screen.getByText("Меню");
    await userEvent.click(menu);

    const contacs = await screen.findByText("Контакты");
    await userEvent.click(contacs);

    const phoneNumber = await screen.findByText("+7 999 000 00 00");
    const map = await screen.findByTestId("map");

    expect(phoneNumber).toBeInTheDocument();
    expect(map).toBeInTheDocument();
  });
});
