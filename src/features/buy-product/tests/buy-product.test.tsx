import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderComponents } from "./render-components";

describe("Product page", () => {
  test("Adding and removing a product from the basket", async () => {
    renderComponents({
      initialEntry: "/products/2",
    });

    const button = await screen.findByText("В корзину");
    let basket = screen.queryByTestId("basket-test-id");
    expect(basket).toBeNull();

    await userEvent.click(button);

    basket = screen.getByTestId("basket-test-id");
    expect(basket).toBeInTheDocument();

    await userEvent.click(basket);

    const count = screen.getByTestId("count-product-test-id");
    const plus = screen.getByText("+");
    const minus = screen.getByText("-");

    expect(count).toHaveTextContent("1");
    await userEvent.click(plus);
    expect(count).toHaveTextContent("2");
    await userEvent.click(minus);
    expect(count).toHaveTextContent("1");
    await userEvent.click(minus);

    expect(basket).not.toBeInTheDocument();
  });
});
