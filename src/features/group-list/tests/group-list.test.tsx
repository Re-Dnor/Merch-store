import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { store } from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { GroupsList } from "../group-list";

import { renderComponents } from "./render-components";

describe("Group list markup", () => {
  test("Find all groups title and products", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GroupsList />
        </MemoryRouter>
      </Provider>
    );

    const stickerVelvetTitle = await screen.findByText("Бархатные стикеры");
    const stickerFlatTitle = await screen.findByText("FLAT-стикеры");
    const sticker3DTitle = await screen.findByText("3D-стикеры");

    expect(stickerVelvetTitle).toBeInTheDocument();
    expect(stickerFlatTitle).toBeInTheDocument();
    expect(sticker3DTitle).toBeInTheDocument();

    const products = await screen.findAllByTestId("product-item");
    expect(products).toHaveLength(9);
  });
});

describe("Tests redirect to products from your-design", () => {
  test("Go to velvet product", async () => {
    renderComponents({ initialEntry: "/your-design" });

    const hoodie = await screen.findByTestId("card-image-5");

    await userEvent.click(hoodie);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      // eslint-disable-next-line max-len
      "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь."
    );
    const price = await screen.findByText("4199₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to flat product", async () => {
    renderComponents({ initialEntry: "/your-design" });

    const hoodie = await screen.findByTestId("card-image-8");

    await userEvent.click(hoodie);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      // eslint-disable-next-line max-len
      "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь."
    );
    const price = await screen.findByText("4149₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("Go to 3D product", async () => {
    renderComponents({ initialEntry: "/your-design" });

    const hoodie = await screen.findByTestId("card-image-11");

    await userEvent.click(hoodie);
    // eslint-disable-next-line max-len
    const text = await screen.findByText(
      // eslint-disable-next-line max-len
      "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь."
    );
    const price = await screen.findByText("4099₽");
    expect(text).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
