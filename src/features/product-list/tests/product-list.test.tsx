import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { ProductList } from "../product-list";

import { renderComponents } from "./render-components";

describe("Product list markup", () => {
  test("Find title, subtitle and products", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByText("Сделано в Альфе");
    const subTitle = screen.getByText(
      "Хотим каждую из этих вещей! Себе, родным и друзьям"
    );
    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();

    const products = await screen.findAllByTestId("product-item");
    expect(products).toHaveLength(5);
  });
});

describe("Tests redirect to products from made-in-alfa", () => {
  test("Go to backpack", async () => {
    renderComponents({ initialEntry: "/made-in-alfa" });

    const backpack = await screen.findByTestId("card-image-0");

    await userEvent.click(backpack);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      // eslint-disable-next-line max-len
      "Поместится и ноутбук, и худи. У рюкзака широкие красные лямки и светоотражающие элементы — вас заметят и днём, и ночью."
    );
    const price = await screen.findByText("4999₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to t-shirt", async () => {
    renderComponents({ initialEntry: "/made-in-alfa" });

    const tShirt = await screen.findByTestId("card-image-1");

    await userEvent.click(tShirt);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      // eslint-disable-next-line max-len
      "Мягкая хлопковая футболка для тех, кто любит быть в центре внимания. Состав и способ ухода вынесли на самое видное место."
    );
    const price = await screen.findByText("1999₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to notebook", async () => {
    renderComponents({ initialEntry: "/made-in-alfa" });

    const notebook = await screen.findByTestId("card-image-2");

    await userEvent.click(notebook);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      "Под твёрдой обложкой — 300 белых страниц с градиентом. Должно хватить для небольшого романа или рабочих записей."
    );
    const price = await screen.findByText("1499₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to phone case", async () => {
    renderComponents({ initialEntry: "/made-in-alfa" });

    const phoneCase = await screen.findByTestId("card-image-3");

    await userEvent.click(phoneCase);

    const text = await screen.findByText("Простите, но товар закончился.");
    const price = await screen.findByText("799₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to phone pen", async () => {
    renderComponents({ initialEntry: "/made-in-alfa" });

    const pen = await screen.findByTestId("card-image-4");

    await userEvent.click(pen);

    const text = await screen.findByText(
      "Мы сделали ручки из переработанной офисной бумаги. У нас всё идёт в дело."
    );
    const price = await screen.findByText("99₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
