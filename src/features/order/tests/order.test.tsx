import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderComponents } from "./render-components";

describe("Order test case", () => {
  test("Adding and removing a product", async () => {
    renderComponents({
      initialEntry: "/products/0",
    });
    const button = await screen.findByText("В корзину");
    const menu = await screen.findByText("Меню");
    await userEvent.click(button);
    await userEvent.click(menu);

    const order = screen.getByText("Заказ");
    await userEvent.click(order);

    const text = screen.getByText("Ваш заказ");
    const count = screen.getByTestId("order-item-test-id");
    const plus = screen.getByText("+");
    const minus = screen.getByText("-");
    expect(text).toBeInTheDocument();
    expect(count).toHaveTextContent("1");
    await userEvent.click(plus);
    expect(count).toHaveTextContent("2");
    await userEvent.click(minus);
    await userEvent.click(minus);
    expect(screen.getByText("Ваша корзина пуста :С")).toBeInTheDocument();
  });
});
